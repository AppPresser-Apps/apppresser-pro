import { BiometricAuth } from '@aparajita/capacitor-biometric-auth';
import { Preferences } from '@capacitor/preferences';
import { state } from './store';

/**
 * Check if biometrics is available
 *
 * @returns boolean
 */
export async function checkBioMetrics(): Promise<boolean> {
  if ('web' === (state.data as any).device.platform) {
    await BiometricAuth.setBiometryType('faceId');
  }
  const bio = await BiometricAuth.checkBiometry();
  console.log('bio', bio);
  return bio.isAvailable;
}

/**
 * Gets biometrics data
 * @returns 
 */
export async function getBioMetrics() {
  if ('web' === (state.data as any).device.platform) {
    await BiometricAuth.setBiometryType('faceId');
  }
  const bio = await BiometricAuth.checkBiometry();
  return bio;
}

/**
 * Authenticate with biometrics
 *
 * @returns boolean
 */
export async function authBiometrics(): Promise<boolean> {
  if ('web' === (state.data as any).device.platform) {
    await BiometricAuth.setBiometryType('faceId');
  }

  try {
    await BiometricAuth.authenticate({
      reason: 'Log into app.',
      cancelTitle: 'Cancel This',
    });
    console.log('bioauth successful');
    updateResumeTime();
    state.biometric = false; 
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Resume biometrics check after 5 minutes
 */
export function resumeBioMetrics(): void {
  console.log('resumeBioMetrics');
  checkResumeTime();
}

async function checkResumeTime(): Promise<void> {
  const { value } = await Preferences.get({ key: 'resumetimestamp' });

  if ( value ) {
    console.log('resumetimestampsssss', parseInt(value));

    const diff = timestamp_diff(parseInt(value), 5);

    if (diff > 1) {
        updateResumeTime();
        const bio = checkBioMetrics();
        if (bio) {
            state.biometric = true;           
        }
      }
  } else {
    updateResumeTime();
  }


}

/**
 * Update resume time
 */
async function updateResumeTime(): Promise<void> {
  const timestamp = Date.now();
  await Preferences.set({ key: 'resumetimestamp', value: `${timestamp}` });
  console.log(timestamp);
}

/**
 * Get timestamp difference in minutes
 *
 * @param timestamp
 * @param _diff
 * @returns number
 */
function timestamp_diff(timestamp, _diff): number {
  const today = Date.now();

  var difference =  today - timestamp;

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  var secondsDifference = Math.floor(difference / 1000);

  console.log('difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');

  console.log(Math.round( ( (today - timestamp) % 3600000) / 60000 ));

  return Math.round( ( (today - timestamp) % 3600000) / 60000 );
}
