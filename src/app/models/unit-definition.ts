export type WidgetTypeEnum = 'WIDGET_CALC' | 'WIDGET_PERIODIC_TABLE' | 'WIDGET_MOLECULE_EDITOR' | 'UNIT';

export interface UnitDefinition {
  id: string;
  version?: string;
  backgroundColor?: string;
  continueButtonShow?: 'ALWAYS';
  widgetType: WidgetTypeEnum;
  parameters?: Record<string, any>;
  sharedParameters?: Record<string, any>;
}
