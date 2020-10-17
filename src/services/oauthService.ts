import runtime from '../sdk/RuntimeContext';
import { ManifestApi } from '../store/ManifestApi';

class OAuthService {
  public openPopup = () => {
    if (!runtime.manifest.api) {
      throw new Error(
        "Can't open auth window for addon which has no api configuration in its manifest"
      );
    }

    const authorizeUrl = this.getOAuthAuthorizeUrl(runtime.manifest.api)
    this.showPopup(authorizeUrl, 800, 600);
  };

  private getOAuthHost = () => {
    const originUrl = new URL(runtime.origin);

    const regex = /https:\/\/(\w+?)\./.exec(originUrl.origin);
    if (!regex) {
      throw new Error('Invalid runtime origin url:' + originUrl.origin);
    }

    return originUrl.origin.replace(regex[1], 'account');
  };

  private getOAuthAuthorizeUrl = (api: ManifestApi) => {
    const host = this.getOAuthHost();
    const scopes = encodeURIComponent(api.scopes.join(' '));
    const redirectUri = encodeURIComponent(api.redirectUri);
    return `${host}/oauth/authorize?client_id=${api.applicationId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;
  };

  private showPopup = (url: string, width: number, height: number) => {
    let dualScreenLeft = window.screenLeft;
    if (!dualScreenLeft) {
      dualScreenLeft = window.screenX;
    }

    let dualScreenTop = window.screenTop;
    if (!dualScreenTop) {
      dualScreenTop = window.screenY;
    }

    let calcWidth: number;
    if (window.innerWidth) {
      calcWidth = window.innerWidth;
    } else {
      calcWidth = document.documentElement.clientWidth;
    }

    if (!calcWidth) {
      calcWidth = screen.width;
    }

    let calcHeight: number;
    if (window.innerHeight) {
      calcHeight = window.innerHeight;
    } else {
      calcHeight = document.documentElement.clientHeight;
    }

    if (!calcHeight) {
      calcHeight = screen.height;
    }

    const systemZoom = calcWidth / window.screen.availWidth;
    const left = (calcWidth - width) / 2 / systemZoom + dualScreenLeft;
    const top = (calcHeight - height) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      url,
      '_blank',
      `scrollbars=yes,
       width=${width / systemZoom}, 
       height=${height / systemZoom}, 
       top=${top}, 
       left=${left}`
    );
    if (newWindow) {
      newWindow.focus();
    }
  };
}

export default new OAuthService();
