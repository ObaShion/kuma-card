import "./index.css";
import { useState, useRef, useEffect } from "react";
import PokemonCardForestTemplate from "./PokemonCardForestTemplate";
import { toPng } from "html-to-image";
import download from "downloadjs";

function App() {
  const [region, setRegion] = useState("秋田市");

  const [safeBg, setSafeBg] = useState("");
  const [warnBg, setWarnBg] = useState("");
  const [dangerBg, setDangerBg] = useState("");
  const [bg, setBg] = useState("");

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // 表示ステータス（背景に紐づく）
  const status = bg && bg === safeBg ? "安全" : bg && bg === warnBg ? "注意" : bg && bg === dangerBg ? "危険" : "";


  // オブジェクトURLの管理（各カテゴリ）
  const prevSafeRef = useRef<string | null>(null);
  const prevWarnRef = useRef<string | null>(null);
  const prevDangerRef = useRef<string | null>(null);

  // 各カテゴリの背景アップロードハンドラ
  const handleSafeBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (prevSafeRef.current) URL.revokeObjectURL(prevSafeRef.current);
    const url = URL.createObjectURL(e.target.files[0]);
    prevSafeRef.current = url;
    setSafeBg(url);
  };
  const handleWarnBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (prevWarnRef.current) URL.revokeObjectURL(prevWarnRef.current);
    const url = URL.createObjectURL(e.target.files[0]);
    prevWarnRef.current = url;
    setWarnBg(url);
  };
  const handleDangerBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (prevDangerRef.current) URL.revokeObjectURL(prevDangerRef.current);
    const url = URL.createObjectURL(e.target.files[0]);
    prevDangerRef.current = url;
    setDangerBg(url);
  };

  // コンポーネント破棄時にオブジェクトURLを解放
  useEffect(() => {
    return () => {
      [prevSafeRef.current, prevWarnRef.current, prevDangerRef.current].forEach((u) => {
        if (u) URL.revokeObjectURL(u);
      });
    };
  }, []);

  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  // 特徴削除
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // 画像アップロード
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };



  // PNG保存機能
  const saveCard = () => {
    const cardElement = document.getElementById("bear-card");
    if (!cardElement) return;

    toPng(cardElement)
      .then((dataUrl) => {
        download(dataUrl, `${region}_熊危険度カード.png`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold text-green-600">秋田県 熊危険度カード</h1>

      {/* 森林名 */}
      <div className="flex gap-2">
        <input
          className="border p-1"
          placeholder="森林名"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </div>

      {/* 背景（カテゴリ別・ローカルファイル選択） */}
      <div className="flex flex-col gap-2 mt-2 items-center">
        <div className="flex gap-2 items-center">
          <button className="px-3 bg-green-700 text-white" onClick={() => setBg(safeBg)}>安全</button>
          <input type="file" accept="image/*" onChange={handleSafeBgUpload} />
          {safeBg && <img src={safeBg} alt="安全プレビュー" className="w-12 h-8 object-cover rounded ml-2" />}
        </div>
        <div className="flex gap-2 items-center">
          <button className="px-3 bg-yellow-600 text-white" onClick={() => setBg(warnBg)}>注意</button>
          <input type="file" accept="image/*" onChange={handleWarnBgUpload} />
          {warnBg && <img src={warnBg} alt="注意プレビュー" className="w-12 h-8 object-cover rounded ml-2" />}
        </div>
        <div className="flex gap-2 items-center">
          <button className="px-3 bg-red-600 text-white" onClick={() => setBg(dangerBg)}>危険</button>
          <input type="file" accept="image/*" onChange={handleDangerBgUpload} />
          {dangerBg && <img src={dangerBg} alt="危険プレビュー" className="w-12 h-8 object-cover rounded ml-2" />}
        </div>
      </div>

      {/* 特徴 */}
      <div className="flex gap-2 mt-2">
        <input
          className="border p-1"
          placeholder="特徴追加"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
        />
        <button className="bg-green-600 text-white px-3" onClick={() => {
          if (newFeature.trim() !== "") setFeatures([...features, newFeature]);
          setNewFeature("");
        }}>追加</button>
      </div>

      {/* 画像アップロード */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {/* カード表示 */}
      <PokemonCardForestTemplate
        region={region}
        status={status}
        bg={bg}
        imageUrl={imageUrl}
        features={features}
        removeFeature={removeFeature}
      />

      {/* 保存ボタン */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
        onClick={saveCard}
      >
        PNG保存
      </button>
    </div>
  );
}

export default App;
