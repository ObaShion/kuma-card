import "./index.css";
import { useState } from "react";
import PokemonCardForestTemplate from "./PokemonCardForestTemplate";

function App() {
  const [region, setRegion] = useState("秋田市");
  const [dangerLevel, setDangerLevel] = useState<"低" | "中" | "高">("低");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bg, setBg] = useState("");

  const [safeBg, setSafeBg] = useState("");
  const [warnBg, setWarnBg] = useState("");
  const [dangerBg, setDangerBg] = useState("");

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold text-green-600">秋田県 熊危険度カード</h1>

      {/* 地域名 */}
      <div className="flex gap-2">
        <input
          className="border p-1"
          placeholder="地域名"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </div>

      {/* 特徴 */}
      <div className="flex gap-2 mt-2">
        <input
          className="border p-1"
          placeholder="特徴追加"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-3"
          onClick={() => {
            if (!newFeature.trim()) return;
            setFeatures([...features, newFeature]);
            setNewFeature("");
          }}
        >
          追加
        </button>
      </div>

      {/* 背景URL設定 */}
      <div className="flex flex-col gap-2 mt-3">
        <input
          className="border p-1 w-80"
          placeholder="安全背景URL"
          value={safeBg}
          onChange={(e) => setSafeBg(e.target.value)}
        />
        <input
          className="border p-1 w-80"
          placeholder="注意背景URL"
          value={warnBg}
          onChange={(e) => setWarnBg(e.target.value)}
        />
        <input
          className="border p-1 w-80"
          placeholder="危険背景URL"
          value={dangerBg}
          onChange={(e) => setDangerBg(e.target.value)}
        />
      </div>

      {/* 危険度切替ボタン */}
      <div className="flex gap-2 mt-2">
        <button className="px-3 bg-green-700 text-white" onClick={() => { setBg(safeBg); setDangerLevel("低"); }}>安全</button>
        <button className="px-3 bg-yellow-600 text-white" onClick={() => { setBg(warnBg); setDangerLevel("中"); }}>注意</button>
        <button className="px-3 bg-red-600 text-white" onClick={() => { setBg(dangerBg); setDangerLevel("高"); }}>危険</button>
      </div>

      {/* 画像URL入力 */}
      <input
        className="border p-1 mt-2 w-80"
        placeholder="画像URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      {/* カード表示 */}
      <PokemonCardForestTemplate
        region={region}
        dangerLevel={dangerLevel}
        bg={bg}
        features={features}
        imageUrl={imageUrl}
        removeFeature={(index) => setFeatures(features.filter((_, i) => i !== index))}
      />
    </div>
  );
}

export default App;
