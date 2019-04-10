/* @flow */
import type {IssueOnList} from './Issue';

export type SprintInformation = {
  id: string,
  name: string,
  goal: ?string,
  archived: boolean,
  start: ?number,
  finish: ?number
};

export type AgileUserProfile = {
  defaultAgile: {
    id: string,
    name: string,
    sprints: Array<SprintInformation>
  },
  visitedSprints: Array<{
    id: string,
    name: string,
    agile: { id: string }
  }>
};

export type AgileColumnFieldValue = {
  id: string,
  presentation: string,
};

export type AgileColumn = {
  id: string,
  collapsed: boolean,
  isVisible: boolean,
  fieldValues: Array<AgileColumnFieldValue>
};

export type BoardCell = {
  id: string,
  tooManyIssues: boolean,
  column: { id: string },
  issues: Array<IssueOnList>
};

export type AgileBoardRow = {
  $type: string,
  id: string,
  name: string,
  collapsed: boolean,
  issue: ?IssueOnList,
  cells: Array<BoardCell>
};

export type BoardColumn = {
  id: string,
  collapsed: boolean,
  agileColumn: AgileColumn
};

export type Board = {
  id: string,
  name: string,
  columns: Array<BoardColumn>,
  orphanRow: AgileBoardRow,
  trimmedSwimlanes: Array<AgileBoardRow>
};

export type BoardOnList = {
  id: string,
  name: string,
  sprints: {id: string, name: string},
  creator: {id: string, fullName: string}
}

export type SprintFull = SprintInformation & {
  board: Board,
  eventSourceTicket: string,
  agile: {
    id: string,
    name: string,
    orphansAtTheTop: boolean,
    isUpdatable: boolean,
    estimationField: {id: string}
  }
};
