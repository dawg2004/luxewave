export type RiskLevel = "高" | "中" | "低";

export type HazardItem = {
  title: string;
  riskLevel: RiskLevel;
  riskTypes: Array<"転倒" | "落下" | "移動" | "飛散" | "避難阻害">;
  visibleReason: string;
  checkPoints: string[];
  actions: string[];
  expertCheck: string;
};

export type HazardResult = {
  summary: string;
  items: HazardItem[];
  disclaimer: string;
};
