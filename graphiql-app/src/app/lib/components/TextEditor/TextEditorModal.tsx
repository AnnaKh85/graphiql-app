import TextEditor from "@app/lib/components/TextEditor/TextEditor";

export default function TextEditorModal() {

    return <div className={"modal"}>
        <div className={"modal-dialog"}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Редактор</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <TextEditor />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary btn-rss">Save</button>
                    <button type="button" className="btn btn-outline-secondary btn-rss" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>;
}