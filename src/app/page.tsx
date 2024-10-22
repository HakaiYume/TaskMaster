import HomePage from '@/components/HomePage'
import InstallButton from '@/components/InstallButton'
import PushNotification from '@/components/PushNotification'

export const metadata = {
  title: "TaskMaster",
  description: "A Nextjs Example",
};

export default function Page() {
  return (
    <div className='grid grid-cols-1 gap-2'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
        <PushNotification />
        <InstallButton />
      </div>
      <HomePage />
    </div>
  )
}