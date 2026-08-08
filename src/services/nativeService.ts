import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Network, type ConnectionStatus } from '@capacitor/network';

export class NativeService {
  private static isInitialized = false;

  public static async initNativeFeatures(onHardwareBack?: () => void): Promise<void> {
    if (this.isInitialized) return;
    this.isInitialized = true;

    try {
      // 1. Hide splash screen after app load
      await SplashScreen.hide();
    } catch (e) {
      // Running in web browser
    }

    try {
      // 2. Configure dark status bar matching app theme (#0d1322)
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#0d1322' });
    } catch (e) {
      // Running in web browser
    }

    try {
      // 3. Register Android Hardware Back Button Handler
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (onHardwareBack) {
          onHardwareBack();
        } else if (canGoBack) {
          window.history.back();
        } else {
          CapacitorApp.exitApp();
        }
      });
    } catch (e) {
      // Running in web browser
    }
  }

  public static async triggerHapticImpact(style: ImpactStyle = ImpactStyle.Light): Promise<void> {
    try {
      await Haptics.impact({ style });
    } catch (e) {
      // Haptics not available in standard web browser
    }
  }

  public static async triggerHapticNotification(type: NotificationType = NotificationType.Success): Promise<void> {
    try {
      await Haptics.notification({ type });
    } catch (e) {
      // Haptics not available in standard web browser
    }
  }

  public static async listenNetworkStatus(callback: (status: ConnectionStatus) => void): Promise<void> {
    try {
      const status = await Network.getStatus();
      callback(status);
      Network.addListener('networkStatusChange', callback);
    } catch (e) {
      // Network plugin not supported in standard web browser
    }
  }
}
