import React, { useState } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import RegisterAbout from './RegisterAbout';
import RegisterAccount from './RegisterAccount';

const RegisterWizard = ({ formData, handleChange, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Create an Account</h5>
          <span className="text-muted">Step {currentStep} of {totalSteps}</span>
        </div>
        <ProgressBar now={progressPercentage} className="mt-2" />
      </Card.Header>
      <Card.Body>
        {currentStep === 1 && (
          <RegisterAbout 
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <RegisterAccount 
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            onSubmit={onSubmit}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default RegisterWizard;