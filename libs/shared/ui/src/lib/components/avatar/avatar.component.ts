import { Component, OnInit, Input } from '@angular/core';

const DEFAULT_SIZE = '6em';
const DEFAULT_BACKGROUND_COLOR = 'transparent';
const DEFAULT_BORDER_WIDTH = '0.3em';
const DEFAULT_BORDER_COLOR = 'gray';
const DEFAULT_AS_CENTER = false;
const DEFAULT_AVATAR_PATH = '/assets/images/profile-avatar.png';

@Component({
  selector: 'x365-shared-ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() public width = DEFAULT_SIZE;
  @Input() public height = DEFAULT_SIZE;

  @Input() public src = '';

  @Input() public centerAvatar: boolean = DEFAULT_AS_CENTER;
  @Input() public avatarPath: string = DEFAULT_AVATAR_PATH;

  @Input() public makeAvatarALink: false;
  @Input() public linkUrl = '';

  @Input() public showBorder = false;
  @Input() public isRounded = true;

  @Input() public borderWidth = DEFAULT_BORDER_WIDTH;
  @Input() public borderColor = DEFAULT_BORDER_COLOR;

  @Input() public altText = '';

  constructor() {}

  ngOnInit() {}

  getStyles(): any {
    const width = this.width || DEFAULT_SIZE;
    const height = this.height || DEFAULT_SIZE;
    const borderColor = this.borderColor || DEFAULT_BORDER_COLOR;
    const borderRadius = this.isRounded ? '50%': '0';
    const borderWidth = this.showBorder ? this.borderWidth || DEFAULT_BORDER_WIDTH: '0';

    let backgroundImage: string;
    if (this.src === null || this.src === '') {
      backgroundImage = this.avatarPath;
    } else {
      backgroundImage = `url(${this.src})`;
    }

    return {
      width: width,
      height: height,
      borderWidth: borderWidth,
      borderStyle: 'solid',
      borderColor: borderColor,
      borderRadius: borderRadius,
      backgroundImage: backgroundImage
    }
  }

  getLoadingStyles(): any {
    const width = this.width || DEFAULT_SIZE;
    const height = this.height || DEFAULT_SIZE;

    return {
      width: width,
      height: height
    };
  }

  getSpinnerBackgroundImage(): any {
    const backgroundImage = this.avatarPath || DEFAULT_AVATAR_PATH;
    return `url(${backgroundImage})`;
  }
}
