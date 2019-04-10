/* @flow */
/* eslint-disable no-unused-vars */
import type {IssueProject, IssueComment, IssueUser} from './CustomFields';

type EventBase = {
  id: string,
  name: string,
  text: string,
  color: {id: string}
}

type ActivityAttachment = EventBase & {
  url: string,
  mimeType: string,
  removed: boolean,
  thumbnailURL: string
}

type ActivityIssue = EventBase & {
  idReadable: string,
  summary: string,
  resolved: boolean,
  created: number,
  updated: number,
  project: IssueProject,
}

type ActivityWorkItem = EventBase & {
  $type: string;
  date: number;
  type: {name: string},
  duration: {minutes: number}
}

export type AddedActivityItem = IssueProject | IssueComment | ActivityIssue | Object;
export type RemovedActivityItem = IssueProject | IssueComment | ActivityIssue;

export type IssueActivity = {
  id: string;
  category: {id: string},
  timestamp: number,
  targetMember: any,
  targetSubMember: Object,
  authorGroup: {
    icon: string,
    name: string
  },
  author: IssueUser,
  target: {id: string, created: number, usesMarkdown: boolean},
  field: Object,
  added: string | Array<AddedActivityItem>,
  removed: Array<RemovedActivityItem> | null
}
