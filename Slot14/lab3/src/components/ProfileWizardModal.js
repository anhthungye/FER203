import React, { useState, useReducer, useMemo, useCallback } from 'react';
import { Modal, Tab, Tabs, Toast, Button } from 'react-bootstrap';
import AboutTab from './AboutTab';
import AccountTab from './AccountTab';
import AddressTab from './AddressTab';
import ProfileSummary from './ProfileSummary';

const initialState = {
  step: 0,
  about: {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    avatar: null,
    avatarPreview: ''
  },
  account: {
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    secretAnswer: ''
  },
  address: {
    street: '',
    city: '',
    province: '', 
    zipCode: '',
    country: ''
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 };
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.field]: action.value
        }
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function ProfileWizardModal({ show, onHide }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const steps = ['About', 'Account', 'Address'];

  const isAboutValid = useMemo(() => {
    const { firstName, lastName, age, email, phone, avatar } = state.about;
    if (!firstName.trim() || !lastName.trim()) return false;
    const ageValid = Number(age) >= 18 && Number(age) <= 100;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const phoneOk = /^\+?\d{10,15}$/.test(phone.trim());
    const avatarOk = !!avatar;
    return ageValid && emailOk && phoneOk && avatarOk;
    }, [state.about]);

  const isAccountValid = useMemo(() => {
    const { username, password, confirmPassword, secretQuestion, secretAnswer } = state.account;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?\":{}|<>]/.test(password);

    return (
      username.length >= 6 &&
      password.length >= 8 &&
      hasUpperCase &&
      hasNumber &&
      hasSpecialChar &&
      password === confirmPassword &&
      secretQuestion !== '' &&
      secretAnswer.trim() !== ''
    );
  }, [state.account]);

  const isAddressValid = useMemo(() => {
    const { street, city, province, zipCode, country } = state.address;
    return (
      street.trim() !== '' &&
      city.trim() !== '' &&
      province.trim() !== '' &&
      zipCode.trim() !== '' &&
      country.trim() !== ''
    );
  }, [state.address]);


  const nextStep = useCallback(() => {
    if (
      (state.step === 0 && isAboutValid) ||
      (state.step === 1 && isAccountValid)
    ) {
      dispatch({ type: 'NEXT_STEP' });
    }
  }, [state.step, isAboutValid, isAccountValid]);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  const handleFieldChange = useCallback((section, field, value) => {
    dispatch({ type: 'UPDATE_FIELD', section, field, value });
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFieldChange('about', 'avatar', file);
        handleFieldChange('about', 'avatarPreview', reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [handleFieldChange]);

  const handleSubmit = useCallback(() => {
    if (isAddressValid) {
      setShowSummary(true);
      setShowSuccess(true);
      onHide();  
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [isAddressValid, onHide]);

  const handleClose = useCallback(() => {
    dispatch({ type: 'RESET' });
    setShowSummary(false);
    onHide();
  }, [onHide]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered className="profile-wizard">
        <Modal.Header closeButton>
          <Modal.Title>Build Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Tabs activeKey={state.step} id="profile-wizard-tabs" className="mb-3">
            {steps.map((step, index) => (
              <Tab key={index} eventKey={index} title={step} disabled={index > state.step}>
                {index === 0 && (
                  <AboutTab 
                    data={state.about} 
                    onChange={handleFieldChange} 
                    onFileChange={handleFileChange} 
                  />
                )}
                {index === 1 && (
                  <AccountTab 
                    data={state.account} 
                    onChange={handleFieldChange} 
                  />
                )}
                {index === 2 && (
                  <AddressTab 
                    data={state.address} 
                    onChange={handleFieldChange} 
                  />
                )}
              </Tab>
            ))}
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          {state.step > 0 && (
            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
          )}
          {state.step < steps.length - 1 ? (
            <Button 
              variant="primary" 
              onClick={nextStep}
              disabled={
                (state.step === 0 && !isAboutValid) ||
                (state.step === 1 && !isAccountValid)
              }
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="success" 
              onClick={handleSubmit}
              disabled={!isAddressValid}
            >
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <ProfileSummary 
        show={showSummary} 
        onHide={() => setShowSummary(false)} 
        data={{ about: state.about, account: state.account, address: state.address }} 
      />

      <Toast 
        show={showSuccess} 
        onClose={() => setShowSuccess(false)}
        delay={3000} 
        autohide
        className="position-fixed top-0 end-0 m-3"
        bg="success"
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
      </Toast>
    </>
  );
}

export default ProfileWizardModal;
