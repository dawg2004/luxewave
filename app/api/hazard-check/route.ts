import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const image = form.get("image") as File | null;
    const roomName = String(form.get("roomName") ?? "");
    const memo = String(form.get("memo") ?? "");

    if (!image) return NextResponse.json({ error: "画像が必要です。" }, { status: 400 });
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const prompt = `アップロードされた園内写真を確認し、地震時の「転倒・落下・移動・飛散・避難阻害」リスクを一次スクリーニングしてください。\n部屋名:${roomName}\n補足:${memo}\n\n重要ルール:\n・写真だけで安全性を断定しない\n・「必ず倒れる」「安全です」と言わない\n・「可能性があります」「確認が必要です」と表現する\n・園児の顔や個人情報には言及しない\n・一次スクリーニングとして確認候補と改善アクションを提示する\n\nJSON形式のみで返すこと。`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            { type: "input_image", image_url: `data:${image.type};base64,${base64}` }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "hazard_screening",
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["summary", "items", "disclaimer"],
            properties: {
              summary: { type: "string" },
              items: { type: "array", items: { type: "object", additionalProperties: true } },
              disclaimer: { type: "string" }
            }
          }
        }
      }
    });

    const output = response.output_text;
    return NextResponse.json({ result: JSON.parse(output) });
  } catch (e) {
    return NextResponse.json({ error: "解析エラー", detail: String(e) }, { status: 500 });
  }
}
