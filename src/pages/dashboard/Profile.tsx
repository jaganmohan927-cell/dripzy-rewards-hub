import { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
  });

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      }
    });
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleEmailChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Verification Email Sent",
      description: `A verification link has been sent to ${newEmail}`,
    });
    setShowEmailModal(false);
    setNewEmail('');
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `OTP has been sent to ${formData.phone || 'your phone number'}`,
    });
  };

  const handleVerifyPhone = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Phone Verified",
      description: "Your phone number has been verified successfully!",
    });
    setShowPhoneModal(false);
    setPhoneOtp('');
    setOtpSent(false);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold">My Profile</h1>
        <p className="text-sm md:text-base text-muted-foreground">Manage your account details</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-border">
          <div className="w-14 h-14 md:w-20 md:h-20 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-primary">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold">{user?.name}</h2>
            <p className="text-sm md:text-base text-muted-foreground">{user?.email}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
              Member since {user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A'}
            </p>
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-secondary rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Your Referral Code</p>
          <p className="font-mono font-bold text-lg md:text-xl text-primary">{user?.referralCode}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Personal Info */}
          <div>
            <h3 className="font-semibold text-sm md:text-base mb-3 md:mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <Label htmlFor="name" className="text-xs md:text-sm">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 md:mt-1.5 bg-secondary border-border text-sm"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs md:text-sm">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="mt-1 md:mt-1.5 bg-secondary border-border opacity-60 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs md:text-sm">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="mt-1 md:mt-1.5 bg-secondary border-border text-sm"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-sm md:text-base mb-3 md:mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Delivery Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="street" className="text-xs md:text-sm">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="House no., Street, Landmark"
                  className="mt-1 md:mt-1.5 bg-secondary border-border text-sm"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-xs md:text-sm">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="mt-1 md:mt-1.5 bg-secondary border-border text-sm"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-xs md:text-sm">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="mt-1 md:mt-1.5 bg-secondary border-border text-sm"
                />
              </div>
              <div>
                <Label htmlFor="pincode" className="text-xs md:text-sm">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  className="mt-1 md:mt-1.5 bg-secondary border-border text-sm"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="btn-glow text-sm md:text-base">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </form>
      </div>

      {/* Account Settings */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6">
        <h3 className="font-semibold text-sm md:text-base mb-3 md:mb-4">Account Settings</h3>
        <div className="space-y-3 md:space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start text-sm"
            onClick={() => setShowEmailModal(true)}
          >
            <Mail className="w-4 h-4 mr-2" />
            Change Email
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-sm"
            onClick={() => setShowPhoneModal(true)}
          >
            <Phone className="w-4 h-4 mr-2" />
            Verify Phone Number
          </Button>
        </div>
      </div>

      {/* Change Email Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="sm:max-w-md mx-4 bg-card border-border">
          <DialogHeader>
            <DialogTitle>Change Email Address</DialogTitle>
            <DialogDescription>
              Enter your new email address. We'll send a verification link.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEmailChange} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="currentEmail">Current Email</Label>
              <Input
                id="currentEmail"
                value={user?.email || ''}
                disabled
                className="mt-1.5 bg-secondary border-border opacity-60"
              />
            </div>
            <div>
              <Label htmlFor="newEmail">New Email</Label>
              <Input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email address"
                className="mt-1.5 bg-secondary border-border"
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEmailModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 btn-glow">
                Send Verification
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Verify Phone Modal */}
      <Dialog open={showPhoneModal} onOpenChange={setShowPhoneModal}>
        <DialogContent className="sm:max-w-md mx-4 bg-card border-border">
          <DialogHeader>
            <DialogTitle>Verify Phone Number</DialogTitle>
            <DialogDescription>
              {otpSent 
                ? 'Enter the OTP sent to your phone number' 
                : 'We\'ll send an OTP to verify your phone number'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleVerifyPhone} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="verifyPhone">Phone Number</Label>
              <Input
                id="verifyPhone"
                value={formData.phone || '+91 9876543210'}
                disabled={otpSent}
                className="mt-1.5 bg-secondary border-border"
              />
            </div>
            
            {otpSent && (
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="mt-1.5 bg-secondary border-border"
                  maxLength={6}
                  required
                />
              </div>
            )}
            
            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowPhoneModal(false);
                  setOtpSent(false);
                  setPhoneOtp('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              {otpSent ? (
                <Button type="submit" className="flex-1 btn-glow">
                  <Check className="w-4 h-4 mr-2" />
                  Verify
                </Button>
              ) : (
                <Button type="button" onClick={handleSendOtp} className="flex-1 btn-glow">
                  Send OTP
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
