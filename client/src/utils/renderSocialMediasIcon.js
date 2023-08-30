import { Icon } from '@dataesr/react-dsfr';
import academia from '../assets/img/svg-logo/academia.svg';
import dailymotion from '../assets/img/svg-logo/dailymotion.svg';
import flickr from '../assets/img/svg-logo/flickr.svg';
import franceCulture from '../assets/img/svg-logo/france-culture.svg';
import pinterest from '../assets/img/svg-logo/pinterest.svg';
import researchgate from '../assets/img/svg-logo/researchgate.svg';
import scoopit from '../assets/img/svg-logo/scoop-it.svg';
import scribd from '../assets/img/svg-logo/scribd.svg';
import snapchat from '../assets/img/svg-logo/snapchat.svg';
import soundcloud from '../assets/img/svg-logo/soundcloud.svg';
import tiktok from '../assets/img/svg-logo/tiktok.svg';
import tumblr from '../assets/img/svg-logo/tumblr.svg';
import vimeo from '../assets/img/svg-logo/vimeo.svg';

export const renderIcon = (iconType) => {
  let iconColor = null;
  let rxIcon = null;
  let svg = null;

  switch (iconType) {
  case 'academia':
    svg = academia;
    break;
  case 'Dailymotion':
    svg = dailymotion;
    break;
  case 'Facebook':
    iconColor = 'var(--facebook-icon-color)';
    rxIcon = 'ri-facebook-fill';
    break;
  case 'Flickr':
    svg = flickr;
    break;
  case 'France Culture':
    svg = franceCulture;
    break;
  case 'Instagram':
    iconColor = 'var(--instagram-icon-color)';
    rxIcon = 'ri-instagram-fill';
    break;
  case 'Github':
    iconColor = 'var(--github-icon-color)';
    rxIcon = 'ri-github-fill';
    break;
  case 'Gitlab':
    iconColor = 'var(--gitlab-icon-color)';
    rxIcon = 'ri-gitlab-fill';
    break;
  case 'Linkedin':
    iconColor = 'var(--linkedin-icon-color)';
    rxIcon = 'ri-linkedin-fill';
    break;
  case 'Pinterest':
    svg = pinterest;
    break;
  case 'researchgate':
    svg = researchgate;
    break;
  case 'Scoopit':
    svg = scoopit;
    break;
  case 'Scribd':
    svg = scribd;
    break;
  case 'Snapchat':
    svg = snapchat;
    break;
  case 'soundcloud':
    svg = soundcloud;
    break;
  case 'Tiktok':
    svg = tiktok;
    break;
  case 'Tumblr':
    svg = tumblr;
    break;
  case 'Twitter':
    iconColor = 'var(--twitter-icon-color)';
    rxIcon = 'ri-twitter-fill';
    break;
  case 'Twitch':
    iconColor = 'var(--twitch-icon-color)';
    rxIcon = 'ri-twitch-fill';
    break;
  case 'Vimeo':
    svg = vimeo;
    break;
  case 'Youtube':
    iconColor = 'var(--youtube-icon-color)';
    rxIcon = 'ri-youtube-fill';
    break;
  default:
    break;
  }
  return iconColor ? <Icon className="fr-mb-1w fr-pt-1w" name={rxIcon} size="1x" color={iconColor} />
    : <img className="fr-card__content" style={{ width: '100px' }} src={svg} alt="logo" />;
};
