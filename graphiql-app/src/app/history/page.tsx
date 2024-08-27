export default function HistoryPage() {

    return <>
        <div className={"card min-vw-90"}>
            <div className={"card-body"}>
                <h6 className={"card-title"}>History Requests</h6>

                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col"}>

                            <table className={"table table-bordered"}>
                                <thead>
                                <tr>
                                    <th>Method</th>
                                    <th>URL</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>GET</td>
                                    <td>https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md</td>
                                    <td><button className={"btn btn-link btn-sm"}>.....</button></td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;

}