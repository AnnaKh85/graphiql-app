import TextEditor from "@app/lib/components/TextEditor/TextEditor";
import Response from "@app/lib/components/Response/Response";

export default function RestfulClientPage() {

    return <>
        <div className={"card min-vw-90"}>
            <div className={"card-body"}>
                <h6 className={"card-title"}>REST Client</h6>

                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col-3"}>
                            <div className="mb-1">
                                <label className={"form-label"}>Method</label>
                                <select className={"form-select"} defaultValue={"POST"}>
                                    <option value="POST">POST</option>
                                    <option value="GET">GET</option>
                                </select>
                            </div>
                        </div>
                        <div className={"col-9"}>
                            <div className="mb-1">
                                <label className={"form-label"}>Endpoint URL</label>
                                <input className={"form-control"} type="url" />
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col"}>
                            <div className={"row"}>
                                <div className={"col-auto"}>
                                    <label className={"col-form-label"}>Headers:</label>
                                </div>
                                <div className={"col-auto"}>
                                    <button className={"btn btn-sm btn-outline-secondary"}>
                                        <i className="bi bi-plus-circle"></i>
                                    </button>
                                </div>
                            </div>

                            <div className={"row"}>
                                <div className={"col"}>
                                    <table className={"table table-bordered"}>
                                        <thead>
                                        <tr>
                                            <th>Del</th>
                                            <th>Header Key</th>
                                            <th>Header Value</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><button className={"btn btn-sm btn-outline-secondary"}><i className="bi bi-cart-x"></i></button></td>
                                            <td>Header Key</td>
                                            <td>Header Value</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col"}>
                            <div className={"row"}>
                                <div className={"col-auto"}>
                                    <label className={"col-form-label"}>Body:</label>
                                    <br/>
                                    <button className={"btn btn-sm btn-outline-secondary"} title="Beautify">
                                        <i className="bi bi-flower1"></i>
                                    </button>
                                </div>
                                <div className={"col"}>
                                    <TextEditor />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>



        <div className={"card min-vw-90 mt-2"}>
            <div className={"card-body"}>
                <h6 className={"card-title"}>Response</h6>
                <Response />
            </div>
        </div>


    </>;
}

