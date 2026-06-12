import { useNavigate } from "react-router-dom";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

function IzinTuruForm({
    formData,
    onChange,
    onSubmit,
    buttonText = "Kaydet",
}) {
    const navigate = useNavigate();

    return (
        <div className="card max-w-md p-6 sm:p-8">
            <Input
                label="İzin Türü Adı"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="İzin türü adı giriniz"
            />

            <div className="mt-2 flex justify-end gap-3 border-t border-accent/60 pt-4">
                <Button text="İptal" variant="outline" onClick={() => navigate(-1)} />
                <Button text={buttonText} onClick={onSubmit} />
            </div>
        </div>
    );
}

export default IzinTuruForm;
