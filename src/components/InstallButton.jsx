"use client"
import { useState, useEffect } from 'react';

function InstallButton() {
  const [isReadyForInstall, setIsReadyForInstall] = useState(false)

    function Install() {
      window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    })
  }

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  useEffect(() => {
    Install()
  }, []);

  return (
    <div className='bg-gray-800 p-4 text-white rounded-md h-full'>
      {isReadyForInstall ? (
        <div>
          <h3 className='text-2xl font-bold pb-3'>Install App</h3>
          <div className='container flex justify-between px-10 md:px-0 mx-auto'>
            <p className="text-slate-300"> Have you not installed this app on your device yet?.</p>
            <button className='bg-green-600 hover:cursor-pointe hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg' onClick={downloadApp}>
              Add to Home Screen
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className='text-2xl font-bold pb-3 text-center'>Thanks for Install!!!</h3>
          <p className="text-slate-300 text-center"> If you do not install this app, your browser may not be compatible.</p>
        </div>
      )
      }
    </div>
  )
}

export default InstallButton