import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

function DepartmanForm({
    formData,
    onChange,
    onSubmit,
    buttonText = "Kaydet",
}) {
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

            <Button text={buttonText} onClick={onSubmit} className="mt-2" />
        </div>
    );
}

export default DepartmanForm;
