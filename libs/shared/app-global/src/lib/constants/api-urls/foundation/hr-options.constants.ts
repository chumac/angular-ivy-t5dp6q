export const addstep: {value:number, label:string}[]= [
  {value: 2, label: "Specific Individual"},
  {value: 3, label: "Specific Position"},
  {value: 4, label: "Specific Role"},
  {value: 1, label: "Sender's supervisor"},
  {value: 0, label: "Employee's supervisor"}
  ];

  export const Notification: {value:number, label:string}[]= [
      {value: 0, label: "Human Resources"},
      {value: 1, label: "Supervisor"},
      {value: 2, label: "Back up Officer or Relief"},
      {value: 3, label: "Email Group"},
      {value: 4, label: "Specific Position"},
      {value: 5, label: "All Staff (Reserved)"},
      {value: 6, label: "Original Sender"},
      {value: 7, label: "Custom Group"},
      {value: 8, label: "Sender"}
      ];

      export const Notification_process: {value:number, label:string}[]= [
          {value: 0, label: "Process Initiated"},
          {value: 1, label: "Awaiting Approval"},
          {value: 2, label: "Approved"},
          {value: 3, label: "Redirect"},
          {value: 4, label: "Escalated"},
          {value: 5, label: "Declined"},
          {value: 6, label: "Finalized"},
          {value: 7, label: "Employee Feedback"}
          ];


      export const BulkSecurity: {value:number, label:string}[]= [
            {value: 0, label: "Deactivate User Account "},
            {value: 1, label: "Reactivate User Account"},
            {value: 2, label: "Remove User in Role"},
            {value: 3, label: "Place User in Role"},
            ];

      export const Display: { value:number, label:string}[]=[
        {value: 0, label: "All"},
        {value: 1, label: "With Criteria"},
      ]

          export const Educational_Institution: {value:number, label:string}[]= [
            {value: 0, label: "Professional"},
            {value: 1, label: "Educational"},
            ];

          export const Qualification_Category: {value:number, label:string}[]= [
              {value: 0, label: "Education"},
              {value: 1, label: "Professional"},
              ];

          export const Report: {value:number, label:string}[]= [
            {value: 0, label: "Everyone"},
            {value: 1, label: "Specific Role"},
            {value: 2, label: "Specific Logon"},
                ];
