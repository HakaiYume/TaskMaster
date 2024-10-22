"use client"
import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '@/actions'

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
      .replace(/\\-/g, '+')
      .replace(/_/g, '/')
   
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
  
  function PushNotification() {
    const [isSupported, setIsSupported] = useState(false)
    const [subscription, setSubscription] = useState<PushSubscription | null>(
      null
    )
    const [message, setMessage] = useState('')
   
    useEffect(() => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        setIsSupported(true)
        registerServiceWorker()
      }
    }, [])
   
    async function registerServiceWorker() {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    }
   
    async function subscribeToPush() {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      })
      setSubscription(sub)
      await subscribeUser(sub)
    }
   
    async function unsubscribeFromPush() {
      await subscription?.unsubscribe()
      setSubscription(null)
      await unsubscribeUser()
    }
   
    async function sendTestNotification() {
      if (subscription) {
        await sendNotification(message)
        setMessage('')
      }
    }
   
    if (!isSupported) {
      return <p>Push notifications are not supported in this browser.</p>
    }
   
    return (
      <div className='bg-gray-800 p-10 text-white rounded-md h-full'>
        <h3 className="text-2xl font-bold pb-3">Push Notifications</h3>
        {subscription ? (
          <>
            <div className='container flex justify-between px-10 md:px-0 mx-auto'>
              <p className="text-slate-300">You are subscribed to push notifications.</p>
              <button className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md' onClick={unsubscribeFromPush}>Unsubscribe</button>
            </div>
            <input
              type="text"
              className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg' onClick={sendTestNotification}>Send Test</button>
          </>
        ) : (
          <div className='container flex justify-between px-10 md:px-0 mx-auto'>
            <p className="text-slate-300">You are not subscribed to push notifications.</p>
            <button className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg' onClick={subscribeToPush}>Subscribe</button>
          </div>
        )}
        </div>
    )
  }

  export default PushNotification