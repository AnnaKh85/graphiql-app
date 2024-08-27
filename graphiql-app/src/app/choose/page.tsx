import Link from "next/link";

export default function ChooseClientPage() {


    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"position-relative m-2"}>
                        <label className={"form-label position-relative start-50 translate-middle-x"}>Welcome, [Username]!</label>
                    </div>
                </div>
            </div>

            <div className={"row"}>
                <div className={"col"}>
                    <ul className={"list-group list-group-horizontal"}>
                        <li className={"list-group-item"}>
                            <Link href={"/restfulClient"}>REST Client</Link>
                        </li>
                        <li className={"list-group-item"}>
                            <Link href={"/graphiQlClient"}>GraphiQL Client</Link>
                        </li>
                        <li className={"list-group-item"}>
                            <Link href={"/history"}>History</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}