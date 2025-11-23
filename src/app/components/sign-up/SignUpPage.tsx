/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Container,
  RightPanel,
  FormTitle,
  Form,
  Label,
  TextInput,
  SelectInput,
  CountrySelectorButton,
  CountryDropdown,
  CountrySelectWrapper,
  CountryOption,
  PinkButton,
} from './SignUp.styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { setUser } from '../../utils/storage';
import { useAction } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import bcrypt from 'bcryptjs';
import { setAuthToken } from '../../utils/auth';

type Country = { name: string };
type StepData = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  ageRange?: string;
  country?: string;
  deviceUsed?: string;
  survivorStage?: string;
};

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StepData>({});
  const [countries, setCountries] = useState<Country[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Use Convex action for signup with token generation
  const signupWithToken = useAction(api.usersInfo.signupWithToken);

  const handleChange = (field: keyof StepData, value: string): void => {
    setFormData({ ...formData, [field]: value });
    if (error) setError(''); 
  };

  const nextStep = () => {
    // Validate step 1 fields
    if (step === 1) {
      if (!formData.fullName?.trim()) {
        setError('Full name is required');
        return;
      }
      if (!formData.email?.trim()) {
        setError('Email is required');
        return;
      }
      if (!formData.password) {
        setError('Password is required');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }
    setError('');
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then((res) => res.json())
      .then((data) => {
        const countryList: Country[] = data.map((c: any) => ({
          name: c.name.common,
        }));
        countryList.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      });
  }, []);

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Validate required fields
      if (!formData.email || !formData.password || !formData.fullName) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      if (!formData.ageRange || !formData.country || !formData.deviceUsed || !formData.survivorStage) {
        setError('Please complete all fields in step 2');
        setIsLoading(false);
        return;
      }

      // Extract age number from range (e.g., "25-34" -> 25)
      const ageNumber = formData.ageRange ? parseInt(formData.ageRange.split('-')[0]) : 0;

      // Hash password before sending to Convex
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // Create user and get JWT token (stored in database)
      const result = await signupWithToken({
        full_name: formData.fullName,
        email: formData.email,
        password: hashedPassword,
        age: ageNumber,
        country: formData.country,
        device_type: formData.deviceUsed,
        healing_Journey: formData.survivorStage,
        deviceInfo: navigator.userAgent, // Track device/browser
      });

      // Store JWT token in localStorage
      setAuthToken(result.token);

      // Store current logged-in user locally (optional, for offline access)
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ 
          userId: result.userId,
          email: result.user.email, 
          fullName: result.user.full_name 
        })
      );

      // Log user in via AuthContext with token
      login({ 
        email: result.user.email, 
        fullName: result.user.full_name,
        token: result.token,
      });

      // Store additional user info 
      setUser({
        name: result.user.full_name,
        email: result.user.email,
        ageRange: formData.ageRange,
        country: formData.country,
        deviceUsed: formData.deviceUsed,
        survivorStage: formData.survivorStage,
      });

      // Navigate to home
      navigate('/home');
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <RightPanel>
        <FormTitle>Create Your Account</FormTitle>
        <Form>
          {error && (
            <div style={{ 
              color: '#d32f2f', 
              backgroundColor: '#ffebee', 
              padding: '0.75rem', 
              borderRadius: '4px', 
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          {step === 1 && (
            <>
              <Label>Full Name *</Label>
              <TextInput
                value={formData.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
                disabled={isLoading}
              />

              <Label>Email *</Label>
              <TextInput
                type='email'
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={isLoading}
              />

              <Label>Password *</Label>
              <TextInput
                type='password'
                value={formData.password || ''}
                onChange={(e) => handleChange('password', e.target.value)}
                disabled={isLoading}
              />

              <Label>Confirm Password *</Label>
              <TextInput
                type='password'
                value={formData.confirmPassword || ''}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                disabled={isLoading}
              />
            </>
          )}

          {step === 2 && (
            <>
              <Label>Age Range *</Label>
              <SelectInput
                value={formData.ageRange || ''}
                onChange={(e) => handleChange('ageRange', e.target.value)}
                disabled={isLoading}
              >
                <option value=''>Select</option>
                <option value='18-24'>18-24</option>
                <option value='25-34'>25-34</option>
                <option value='35-44'>35-44</option>
                <option value='45+'>45+</option>
              </SelectInput>

              <Label>Country *</Label>
              <CountrySelectWrapper>
                <CountrySelectorButton 
                  type='button' 
                  onClick={() => !isLoading && setShowDropdown(!showDropdown)}
                  disabled={isLoading}
                >
                  <span>
                    {formData.country || 'Select Country'}
                  </span>
                  <span>▾</span>
                </CountrySelectorButton>
                {showDropdown && (
                  <CountryDropdown>
                    {countries.map((c) => (
                      <CountryOption
                        key={c.name}
                        onClick={() => {
                          handleChange('country', c.name);
                          setShowDropdown(false);
                        }}
                      >
                        {c.name}
                      </CountryOption>
                    ))}
                  </CountryDropdown>
                )}
              </CountrySelectWrapper>

              <Label>Device Used *</Label>
              <SelectInput
                value={formData.deviceUsed || ''}
                onChange={(e) => handleChange('deviceUsed', e.target.value)}
                disabled={isLoading}
              >
                <option value=''>Select</option>
                <option value='Mobile'>Mobile</option>
                <option value='Laptop'>Laptop</option>
              </SelectInput>

              <Label>Healing Journey Stage *</Label>
              <SelectInput
                value={formData.survivorStage || ''}
                onChange={(e) => handleChange('survivorStage', e.target.value)}
                disabled={isLoading}
              >
                <option value=''>Select</option>
                <option value='I am here to learn'>I am here to learn</option>
                <option value='Healing'>Healing</option>
                <option value='Support someone'>Support someone</option>
                <option value='Prefer not to say'>Prefer not to say</option>
              </SelectInput>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            {step > 1 && (
              <PinkButton type='button' onClick={prevStep} disabled={isLoading}>
                Back
              </PinkButton>
            )}
            {step < 2 ? (
              <PinkButton type='button' onClick={nextStep} disabled={isLoading}>
                Next
              </PinkButton>
            ) : (
              <PinkButton
                type='button'
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Complete Sign Up'}
              </PinkButton>
            )}
          </div>
        </Form>
      </RightPanel>
    </Container>
  );
}