import TextEditor from "@app/lib/components/TextEditor/TextEditor";

export default function Response() {


    return <div className={"container-fluid"}>
        <div className={"row"}>

            <div className={"col-auto"}>
                <label className={"col-form-label"}>Status:</label>
            </div>
            <div className={"col"}>
                <span className={"pl-2"}>Текст</span>
            </div>

        </div>
        <div className={"row"}>

            <div className={"col-auto"}>
                <label className={"col-form-label"}>Body:</label>
            </div>
            <div className={"col"}>
                <TextEditor beautifyTrigger={0} value={""} onChange={()=>{}}/>
            </div>

        </div>
    </div>;
}
