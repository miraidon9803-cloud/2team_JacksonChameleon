import { products } from "../data/JacksonDetail";
import { useProductStore } from "../store/ProductStore";

const OptionChange = ({ item }) => {
    const { onOptionChange,cartItems} = useProductStore();
    if (!item) return null;

    // item.id 기준으로 제품 원본 정보 가져오기
    const originProduct = products.find(p => p.id === item.id);
    if (!originProduct) return null;

    const colorOptions = originProduct.color || [];
    const sizeOptions = originProduct.size || [];
    const addOptions = originProduct.add || [];

    return (
        <div className="option-box">
            
            {/* 사이즈 선택 */}
            <select
                value={item.size?.id || ""}
                onChange={(e) => {
                    const newSize = sizeOptions.find(s => String(s.id) === e.target.value);
                    onOptionChange(item.cartId, null, newSize, undefined);
                }}
            >
                {sizeOptions.map(s => (
                    <option key={s.id} value={s.id}>
                        {s.sizename}
                    </option>
                ))}
            </select>

            {/* 색상 선택 */}
            <select
                value={item.color?.id || ""}
                onChange={(e) => {
                    const newColor = colorOptions.find(c => String(c.id) === e.target.value);
                    onOptionChange(item.cartId, newColor, null, undefined);
                }}
            >
                {colorOptions.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.colorname}
                    </option>
                ))}
            </select>

            {/* 옵션 선택 */}
            <select
                value={item.add?.id || ""}
                onChange={(e) => {
                    const newAdd = addOptions.find(a => String(a.id) === e.target.value) || null;
                    onOptionChange(item.cartId, null, null, newAdd);
                }}
            >
                {addOptions.map(a => (
                    <option key={a.id} value={a.id}>
                        {a.cushion}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default OptionChange;
