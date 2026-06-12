import { useNavigate } from "react-router-dom";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

function DepartmanForm({
    formData,
    onChange,
    onSubmit,
    buttonText = "Kaydet",
}) {
    const navigate = useNavigate();

    return (
        <div className="card max-w-md p-6 sm:p-8">
            <Input
                label="Departman Adı"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Departman adı giriniz"
            />

            <div className="flex flex-col gap-1 mb-4">
                <label className="field-label">Açıklama</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    placeholder="Açıklama giriniz"
                    className="field-input"
                    rows={4}
                />
            </div>

            <div className="mt-2 flex justify-end gap-3 border-t border-accent/60 pt-4">
                <Button text="İptal" variant="outline" onClick={() => navigate(-1)} />
                <Button text={buttonText} onClick={onSubmit} />
            </div>
        </div>
    );
}

export default DepartmanForm;
