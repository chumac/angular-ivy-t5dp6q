export const WIDGET_DEFINITION = [
    { id: 1, spec: 'Text Box', type: 'text', validationType:'required', extra:'', hasOptions: false, optionsType: null, optionsData: [], optionsDataSetId: null},
    { id: 2, spec: 'Number Text Box', type: 'number', validationType:'required', extra:'', hasOptions: false, optionsType: null, optionsData: [], optionsDataSetId: null},
    { id: 3, spec: 'Drop Down', type: 'text', validationType:'required', extra:'', hasOptions: true, optionsType: 0, optionsData: [], optionsDataSetId: null},
    { id: 4, spec: 'Text Area', type: 'text', validationType:'required', extra:'', hasOptions: false, optionsType: null, optionsData: [], optionsDataSetId: null},
    { id: 5, spec: 'Date Picker', type: 'text', validationType:'required', extra:'', hasOptions: false, optionsType: null, optionsData: [], optionsDataSetId: null},
    { id: 6, spec: 'Check Box', type: 'text', validationType:'required', extra:'', hasOptions: false, optionsType: null, optionsData: [], optionsDataSetId: null},
    { id: 7, spec: 'File Picker', type: 'text', validationType:'required', extra:'', hasOptions: false, optionsType: null, optionsData: [], optionsDataSetId: null},
    { id: 8, spec: 'Regex Text Box', type: 'regex', validationType:'required', extra:'', hasOptions: false, optionsType: null, optionsData: [], optionsDataSetId: null},
    { id: 9, spec: 'Dictionary Drop Down', type: 'text', validationType:'required', extra:'', hasOptions: true, optionsType: 2, optionsData: [], optionsDataSetId: null},
    { id: 10, spec: 'Dataset Drop Down', type: 'text', validationType:'required', extra:'', hasOptions: true, optionsType: 1, optionsData: [], optionsDataSetId: null},
    { id: 11, spec: 'Time Picker', type: 'text', validationType:'required', extra:'', hasOptions: false, optionsType: null, optionsData: [], optionsDataSetId: null},
    { id: 12, spec: 'Cascading Drop Down', type: 'text', validationType:'required', extra:'', hasOptions: true, optionsType: 3, optionsData: [], optionsDataSetId: null},
    { id: 13, spec: 'Sub Heading', type: 'text', validationType:null, extra:'', hasOptions: false, optionsType: null, optionsData: [], optionsDataSetId: null},
    { id: 14, spec: 'Label', type: 'text', validationType:null, extra:'', hasOptions: false, optionsType: null, optionsData: [], optionsDataSetId: null},
];

export enum widgetType{
    text_box =  1,
    number_text_box = 2,
    drop_down = 3,
    text_area = 4,
    date_picker = 5,
    check_box = 6,
    file_picker = 7,
    regex_text_box = 8,
    dictionary_drop_down = 9,
    dataset_drop_down = 10,
    time_picker = 11,
    cascading_drop_down = 12,
    sub_heading = 13,
    label = 14
};

export enum optionsType{
    default =  0,
    data_set = 1,
    dictionary = 2,
    cascade = 3,
};
