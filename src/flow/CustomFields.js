/* @flow */
import type {IssueOnList} from './Issue';

export type IssueUser = {
  $type: string,
  login: string,
  id: string,
  ringId: string,
  avatarUrl: string,
  fullName: string
};

export type TimeTrackingFieldInfo = {
  id: string,
  field: {
    id: string,
    name: string
  }
};

export type IssueProject = {
  $type: string,
  id: string,
  name: string,
  shortName: string,
  archived: boolean,
  ringId: string,
  plugins?: {
    timeTrackingSettings: {
      enabled: boolean,
      timeSpent: ?TimeTrackingFieldInfo
    }
  }
}

export type ColorField = {
  id: string,
  background: string,
  foreground: string
}

export type Tag = {
  id: string,
  name: string,
  query: string,
  color: ColorField
}

export type BundleValue = {
  $type: string,
  id: string,
  name: string,
  description: string,
  ordinal: number,
  ringId: string,
  login: string,
  released: boolean,
  archived: boolean,
  isResolved: boolean,
  owner: {
    ringId: string,
    login: string
  },
  color: ColorField
}

export type ProjectCustomField = {
  $type: string,
  id: string,
  ordinal: number,
  canBeEmpty: boolean,
  emptyFieldText: ?string,
  bundle: {
    id: string,
    isUpdateable: boolean
  },
  field: {
    isPublic: boolean,
    id: string,
    name: string,
    ordinal: number,
    isPublic: boolean,
    fieldType: {
      valueType: string,
      isMultiValue: boolean
    }
  },
  defaultValues: Array<BundleValue>
}

export type ProjectCustomFieldShort = {
  field: {
    id: string,
    name: string
  }
}

export type FieldValue = {
  $type: string,
  id: string,
  name: string,
  ringId: string,
  fullName: string,
  avatarUrl: string,
  login: string,
  minutes: number,
  presentation: string,
  isResolved: boolean,
  color: ColorField
}

export type FieldValueShort = {
  id: string,
  name: string,
  ringId: string,
  avatarUrl: string,
  login: string,
  presentation: string,
  color: ColorField
}

export type CustomFieldShort = {
  id: string,
  name: string,
  value: FieldValueShort | number,
  projectCustomField: ProjectCustomFieldShort
}

export type CustomField = {
  id: string,
  name: string,
  value: FieldValueShort | number,
  $type: string,
  hasStateMachine: boolean,
  value: FieldValue | number,
  projectCustomField: ProjectCustomField
}

export type CustomColorField = CustomFieldShort & {
  value: FieldValueShort
}

export type Attachment = {
  $type: string,
  id: string,
  name: string,
  url: string,
  mimeType: string
}

export type IssueComment = {
  $type: string,
  id: string,
  created: number,
  textPreview: string,
  deleted: boolean,
  text: string,
  usesMarkdown: boolean,
  author: IssueUser
}

export type IssueLinkType = {
  uid: number,
  name: string,
  sourceToTarget: string,
  localizedSourceToTarget: ?string,
  targetToSource: string,
  localizedTargetToSource: ?string
}

export type IssueLink = {
  $type: string,
  id: string,
  direction: 'OUTWARD' | 'BOTH',
  linkType: IssueLinkType,
  trimmedIssues: Array<IssueOnList>
}
