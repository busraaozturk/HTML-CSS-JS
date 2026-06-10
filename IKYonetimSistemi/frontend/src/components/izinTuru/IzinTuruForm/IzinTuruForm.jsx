import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

function IzinTuruForm({
    formData,
    onChange,
    onSubmit,
    buttonText = "Kaydet",
}) {
    return (
        <div className="card max-w-md p-6 sm:p-8">
            <Input
                label="İzin Türü Adı"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="İzin türü adı giriniz"
            />

            <Button text={buttonText} onClick={onSubmit} className="mt-2" />
        </div>
    );
}

export default IzinTuruForm;
