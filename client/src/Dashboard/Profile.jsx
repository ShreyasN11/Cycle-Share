import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@clerk/clerk-react";

function Profile() {
  const { user, isLoaded, isSignedIn, update } = useUser();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.fullName || 'Shreyas Naik',
    email: user?.emailAddresses[0]?.emailAddress || 'smnaik1109@gmail.com',
    bio: 'Cycling enthusiast and adventure seeker.',
  });

  const handleSaveProfile = async (updatedProfile) => {
    try {
      // Update Clerk user details
      await update({
        firstName: updatedProfile.name.split(' ')[0] || '',
        lastName: updatedProfile.name.split(' ')[1] || '',
        emailAddress: updatedProfile.email,
      });

      // Update local state
      setProfile(updatedProfile);
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!isLoaded || !isSignedIn) return <div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>;

  return (
    <Card className="order-last md:order-first max-h-80">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profile.name} />
            <AvatarFallback>{profile.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="font-semibold text-lg">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
          <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile here.</DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleSaveProfile({
                  name: formData.get('name'),
                  email: formData.get('email'),
                  bio: formData.get('bio'),
                });
              }}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue={profile.name} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={profile.email} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" defaultValue={profile.bio} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default Profile;
