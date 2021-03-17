export const EVENT_DETAIL_URLs = {
    getEventDetailData: '/api/learning/hr/event-details-summary/getlist',
    getEventData: '/api/learning/hr/event-details/get',
    getEventType: '/api/learning/hr/event-details-type/getlist',
    getEventFaculty: '/api/learning/hr/event-faculty-organizer/getlist',
    deleteData: '/api/learning/hr/event-details/delete',
    publishData: '/api/learning/hr/event-details/publish',
    unPublishData: '/api/learning/hr/event-details/unpublish',
    add: '/api/learning/hr/event-details/save/create',
    update : '/api/learning/hr/event-details/update',
    getEventParticipants: '/api/learning/hr/event-participants/getall-by-event',
    closeEvent : '/api/learning/hr/event-details/closed',
    getEventEmployee: '/api/employees/list',
    nominationEvent : '/api/learning/event-faculty-nomination/create',
  };

  export const EVENT_SCHEDULE_URLs = {
    getEventScheduleData: '/api/learning/hr/event-schedule/getall-by-event',
    getMyEventScheduleData: '/api/learning/my-event-schedule/get',
    getEventHallData: '/api/learning/hr/facility-classes/getlist',
    add: '/api/learning/hr/event-schedule/create',
    update: '/api/learning/hr/event-schedule/update',
    delete: '/api/learning/hr/event-schedule/delete'
  };

  export const EVENT_DETAIL_PRE_REQUISITES_URLs = {
    getEventDetailPreRequisitesData: '/api/learning/hr/event-pre-requisites/getall-by-event',
    deleteData: '/api/learning/hr/event-pre-requisites/delete',
    add: '/api/learning/hr/event-pre-requisites/create',
    update : '/api/learning/hr/event-pre-requisites/update',
    getPreRequisitesType: '/api/learning/hr/event-pre-requisites-type/getlist'
  };

  export const EVENT_DETAIL_ASSETS_URLs = {
    getEventDetailAssetsData: '/api/learning/hr/event-assets/getall-by-event',
    getEventDetailAssetsDocument: '/api/document/download',
    deleteData: '/api/learning/hr/event-assets/delete',
    add: '/api/learning/hr/event-assets/create',
    update : '/api/learning/hr/event-assets/update',
    getAvailability: '/api/learning/hr/event-assets-available/getlist',
    getAssetsType: '/api/learning/hr/event-assets/getlist',
  }

  export const FACILITATORS_URLs = {
    getEventDetailFacilitatorsData: '/api/learning/hr/event-faculty/getall-by-event',
    deleteData: '/api/learning/hr/event-faculty/delete',
    add: '/api/learning/hr/event-faculty/create',
    update : '/api/learning/hr/event-faculty/update',
    getFacilitatorsType: '/api/learning/hr/event-faculty-type/getlist',
  }

  export const EVENT_DETAIL_FEEDBACK_FORMS_URLs = {
    getEventDetailFeedbackFormsData: '/api/learning/hr/event-feedback-forms/getall-by-event',
    deleteData: '/api/learning/hr/event-feedback-forms/delete',
    add: '/api/learning/hr/event-feedback-forms/create',
    update : '/api/learning/hr/event-feedback-forms/update',
    getCustomFormData : '/api/custom/custom-forms/getall',
    getFormAvailability : '/api/learning/form-availability/getlist',
    getFormRole : '/api/learning/feedback-role/getlist',
  };

  export const EVENT_PARTICIPANTS_URLs = {
    getEventParticipantsData: '/api/learning/hr/event-participants/getall-by-event',
    getMyEventParticipantsData: '/api/learning/my-event-participant/get',
    getEventParticipantSourceData: '/api/learning/hr/event-participants/source-type/getlist',
    getEventParticipantEmployeeData: '/api/employees/active',
    getEventParticipantScheduleData: '/api/learning/hr/event-schedule/getall-by-event',
    add: '/api/learning/hr/event-participants/create',
    update : '/api/learning/hr/event-participants/update',
    delete: '/api/learning/hr/event-participants/delete',
    getEventParticipantGradeData: '/api/grade/getlist',
    getEventParticipantStructureTypeData: '/api/structuretype/list',
    getEventParticipantCriteriaEmployee: '/api/learning/employees-in-criteria',
    getEventParticipantCriteriaKey: '/api/learning/hr/event-participation-criteria-keys/getlist',
    getEventParticipantCriteriaItems: '/api/learning/hr/event-participation-criteria/getlist',
  };