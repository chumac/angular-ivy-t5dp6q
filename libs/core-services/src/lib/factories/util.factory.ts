import { IndividualConfig } from 'ng-uikit-pro-standard';

function toastOptionsSuccess(): IndividualConfig {
  return {
    enableHtml: true,
    progressBar: true,
    toastClass: 'toast-body-success',
    timeOut: 4000
  };
}

function toastOptionsInformation(): IndividualConfig {
  return {
    enableHtml: true,
    progressBar: true,
    toastClass: 'toast-body-info',
    timeOut: 4000
  };
}

function toastOptionsWarning(): IndividualConfig {
  return {
    enableHtml: true,
    progressBar: true,
    toastClass: 'toast-body-warning',
    timeOut: 4000
  };
}

function toastOptionsError(): IndividualConfig {
  return {
    enableHtml: true,
    progressBar: true,
    toastClass: 'toast-body-error',
    timeOut: 4000
  };
}

export {
  toastOptionsSuccess,
  toastOptionsInformation,
  toastOptionsWarning,
  toastOptionsError
};
