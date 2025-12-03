/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Container,
  FormWrapper,
  FormTitle,
  Form,
  Label,
  TextInput,
  SelectInput,
  CountrySelectorButton,
  CountryDropdown,
  CountrySelectWrapper,
  CountryOption,
  TitleUnderline,
  TitleWrapper,
  PinkButton,
} from './SignUp.styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { setUser } from '../../utils/storage';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import bcrypt from 'bcryptjs';

type Country = { name: string; flag: string };
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Convex mutation
  const createUser = useMutation(api.usersInfo.createUser);

  const handleChange = (field: keyof StepData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    )
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.ageRange) newErrors.ageRange = 'Age Range is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.deviceUsed) newErrors.deviceUsed = 'Device Used is required';
    if (!formData.survivorStage) newErrors.survivorStage = 'Healing Journey Stage is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
      .then((res) => res.json())
      .then((data) => {
        const countryList: Country[] = data.map((c: any) => ({
          name: c.name.common,
          flag: c.flags?.png ?? '',
        }));
        countryList.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      });
  }, []);

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    try {
      setIsLoading(true);
      setErrors({});

      console.log('Collected Sign Up Data:', formData);

      if (!formData.email || !formData.password) {
        alert('Email and password are required');
        setIsLoading(false);
        return;
      }

      // Extract age number from range (e.g., "25-34" -> 25)
      const ageNumber = formData.ageRange ? parseInt(formData.ageRange.split('-')[0]) : 0;

      // Hash password before sending to Convex
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // Create user in Convex (returns the generated userId)
      const result = await createUser({
        full_name: formData.fullName || '',
        email: formData.email,
        password: hashedPassword,
        age: ageNumber,
        country: formData.country || '',
        device_type: formData.deviceUsed || '',
        healing_Journey: formData.survivorStage || '',
      });

      // Store current logged-in user locally (optional, for offline access)
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          userId: result.userId,
          email: formData.email,
          fullName: formData.fullName,
        })
      );

      // Log user in via AuthContext
      login({ email: formData.email, fullName: formData.fullName });

      // Store additional user info
      setUser({
        name: formData.fullName || '',
        email: formData.email || '',
        ageRange: formData.ageRange || '',
        country: formData.country || '',
        deviceUsed: formData.deviceUsed || '',
        survivorStage: formData.survivorStage || '',
      });

      navigate('/home');
    } catch (err: any) {
      console.error('Sign up error:', err);
      setErrors({ submit: err.message || 'Failed to create account. Please try again.' });
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <TitleWrapper>
          <FormTitle>Create Your Account</FormTitle>
          <TitleUnderline />
        </TitleWrapper>
        <Form>
          {errors.submit && (
            <div
              style={{
                color: '#d32f2f',
                backgroundColor: '#ffebee',
                padding: '0.75rem',
                borderRadius: '4px',
                marginBottom: '1rem',
                fontSize: '0.875rem',
              }}
            >
              {errors.submit}
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
              {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}

              <Label>Email *</Label>
              <TextInput
                type='email'
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={isLoading}
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

              <Label>Password *</Label>
              <TextInput
                type='password'
                value={formData.password || ''}
                onChange={(e) => handleChange('password', e.target.value)}
                disabled={isLoading}
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

              <Label>Confirm Password *</Label>
              <TextInput
                type='password'
                value={formData.confirmPassword || ''}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                disabled={isLoading}
              />
              {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
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
              {errors.ageRange && <p style={{ color: 'red' }}>{errors.ageRange}</p>}

              <Label>Country *</Label>
              <CountrySelectWrapper>
                <CountrySelectorButton
                  type='button'
                  onClick={() => !isLoading && setShowDropdown(!showDropdown)}
                  disabled={isLoading}
                >
                  <span>
                    {formData.country ? (
                      <>
                        <img
                          src={countries.find((c) => c.name === formData.country)?.flag || ''}
                          alt={formData.country}
                        />{' '}
                        {formData.country}
                      </>
                    ) : (
                      'Select Country'
                    )}
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
                        <img src={c.flag} alt={c.name} />
                        {c.name}
                      </CountryOption>
                    ))}
                  </CountryDropdown>
                )}
              </CountrySelectWrapper>
              {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}

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
              {errors.deviceUsed && <p style={{ color: 'red' }}>{errors.deviceUsed}</p>}

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
              {errors.survivorStage && <p style={{ color: 'red' }}>{errors.survivorStage}</p>}
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
              <PinkButton type='button' onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Complete Sign Up'}
              </PinkButton>
            )}
          </div>
        </Form>
      </FormWrapper>
    </Container>
  );
}
