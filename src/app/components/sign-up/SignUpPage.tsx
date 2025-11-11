import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  LeftPanel,
  RightPanel,
  FormTitle,
  Form,
  Label,
  TextInput,
  SelectInput,
  SubmitButton,
} from "./SignUp.styles";
import { useNavigate } from "react-router-dom";

type StepData = {
  fullName?: string;
  ageRange?: string;
  country?: string;
  language?: string;
  workplaceRegion?: string;
  department?: string;
  roleType?: string;
  relationshipStatus?: string;
  careResponsibilities?: string;
  deviceUsed?: string;
  gender?: string;
  survivorStage?: string;
};

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StepData>({});

  const handleChange = (field: keyof StepData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const navigate = useNavigate();

  return (
    <Container>
      <LeftPanel>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(157, 78, 221, 0.3)",
            position: "absolute",
            top: "20%",
            left: "10%",
          }}
        />
      </LeftPanel>

      <RightPanel>
        <FormTitle>Create Your Account</FormTitle>
        <Form>
          {step === 1 && (
            <>
              <Label>Full Name</Label>
              <TextInput
                value={formData.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
              <Label>Age Range</Label>
              <SelectInput
                value={formData.ageRange || ""}
                onChange={(e) => handleChange("ageRange", e.target.value)}
              >
                <option value="">Select</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </SelectInput>
              <Label>Country</Label>
              <SelectInput
                value={formData.country || ""}
                onChange={(e) => handleChange("country", e.target.value)}
              >
                <option value="">Select</option>
                <option value="South Africa">South Africa</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Other">Other</option>
              </SelectInput>
              <Label>Language Preference</Label>
              <SelectInput
                value={formData.language || ""}
                onChange={(e) => handleChange("language", e.target.value)}
              >
                <option value="">Select</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </SelectInput>
            </>
          )}

          {step === 2 && (
            <>
              <Label>Workplace Region</Label>
              <SelectInput
                value={formData.workplaceRegion || ""}
                onChange={(e) => handleChange("workplaceRegion", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Region 1">Region 1</option>
                <option value="Region 2">Region 2</option>
              </SelectInput>

              <Label>Department Category</Label>
              <SelectInput
                value={formData.department || ""}
                onChange={(e) => handleChange("department", e.target.value)}
              >
                <option value="">Select</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </SelectInput>

              <Label>Role Type</Label>
              <SelectInput
                value={formData.roleType || ""}
                onChange={(e) => handleChange("roleType", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
              </SelectInput>
            </>
          )}

          {step === 3 && (
            <>
              <Label>Relationship Status</Label>
              <SelectInput
                value={formData.relationshipStatus || ""}
                onChange={(e) => handleChange("relationshipStatus", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </SelectInput>

              <Label>Care Responsibilities</Label>
              <SelectInput
                value={formData.careResponsibilities || ""}
                onChange={(e) => handleChange("careResponsibilities", e.target.value)}
              >
                <option value="">Select</option>
                <option value="None">None</option>
                <option value="Children">Children</option>
              </SelectInput>

              <Label>Device Used</Label>
              <SelectInput
                value={formData.deviceUsed || ""}
                onChange={(e) => handleChange("deviceUsed", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
              </SelectInput>
            </>
          )}

          {step === 4 && (
            <>
              <Label>Gender</Label>
              <SelectInput
                value={formData.gender || ""}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
              </SelectInput>

              <Label>Survivor Journey Stage</Label>
              <SelectInput
                value={formData.survivorStage || ""}
                onChange={(e) => handleChange("survivorStage", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Early">Early</option>
                <option value="Mid">Mid</option>
                <option value="Advanced">Advanced</option>
              </SelectInput>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            {step > 1 && <SubmitButton type="button" onClick={prevStep}>Back</SubmitButton>}
            {step < 4 ? (
              <SubmitButton type="button" onClick={nextStep}>Next</SubmitButton>
            ) : (
                <SubmitButton
                type="button"
                onClick={() => {
                  console.log("Collected Sign Up Data:", formData);
                  navigate("/home"); // redirect registered user to HomeScreen
                }}
              >
                Complete Sign Up
              </SubmitButton>
            )}
          </div>
        </Form>
      </RightPanel>
    </Container>
  );
}
