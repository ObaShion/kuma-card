type CardProps = {
  region: string;
  dangerLevel: "低" | "中" | "高";
  bg: string;
  features: string[];
  imageUrl: string | null;
  removeFeature: (index: number) => void;
};

export default function PokemonCardForestTemplate({
  region,
  dangerLevel,
  bg,
  features,
  imageUrl,
  removeFeature,
}: CardProps) {
  return (
    <div className="w-[350px] h-[520px] rounded-2xl shadow-xl border-4 border-green-700 relative overflow-hidden">

      {/* 背景 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${bg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* header */}
      <div className="relative z-10 flex justify-between items-center p-4 text-yellow-200 text-xl font-bold">
        <span>{region}</span>
        <span className={
          dangerLevel === "低" ? "text-green-400" :
          dangerLevel === "中" ? "text-yellow-400" :
          "text-red-400"
        }>
          {dangerLevel}
        </span>
      </div>

      {/* 編集画像 */}
      <div className="relative z-10 w-[85%] h-[40%] mx-auto rounded-xl overflow-hidden shadow-md border-2 border-yellow-300">
        {imageUrl ? (
          <img src={imageUrl} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-200 text-lg">
            画像エリア
          </div>
        )}
      </div>

      {/* 特徴リスト */}
      <div className="relative z-10 mt-4 p-4 text-white space-y-1 text-sm">
        <p className="text-lg font-bold">特徴</p>
        <ul className="list-inside space-y-1">
          {features.map((item, i) => (
            <li key={i} className="flex justify-between items-center">
              {item}
              <button
                className="text-red-400 font-bold px-2"
                onClick={() => removeFeature(i)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 w-full text-center p-2 text-xs text-gray-300 bg-black/60">
        熊危険度カード - 秋田県
      </div>
    </div>
  );
}
