export default function Footer() {

    return (
        <div className={"row"}>
            <div className={"col-12"}>
                <ul className={"list-group list-group-horizontal"} style={{"overflow": "hidden"}}>
                    <li className={"list-group-item"} style={{"width": "100px", "backgroundColor": "#e4e4e4"}}>
                        <a href="https://github.com/AnnaKh85" target={"_blank"}>
                            <i className="bi bi-github"></i>:Автор
                        </a>
                    </li>
                    <li className={"list-group-item"} style={{"width": "100px", "backgroundColor": "#e4e4e4"}}>
                        <label>2024</label>
                    </li>
                    <li className={"list-group-item"} style={{"width": "100px", "backgroundColor": "#e4e4e4"}}>
                        <a href="https://rs.school/react/" target={"_blank"}>
                            <img src="/rss-course-logo-1.png"
                                 className={"img-fluid"}
                                 alt="course logo" width="30" height="30"
                                 style={{"aspectRatio": "auto", "border": "1px", "borderStyle": "solid", "borderRadius": "3px"}}
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

