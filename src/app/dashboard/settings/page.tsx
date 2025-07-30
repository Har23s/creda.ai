import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">Welcome back, Ada!</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Ada Lovelace" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="ada.lovelace@example.com" disabled />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
      
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            You can reset your password through your authenticated Google account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button>Reset Password via Google</Button>
        </CardContent>
      </Card>
    </div>
  );
}
