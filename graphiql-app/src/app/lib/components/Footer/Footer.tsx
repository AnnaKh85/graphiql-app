import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("FOOTER");

  return (
    <div className={"container-fluid"}>
      <div className={"row"}>
        <div className={"col-12"}>
          <ul
            className={
              "list-group list-group-horizontal navbar-rss ul-footer-rss"
            }
            style={{ overflow: "hidden" }}
          >
            <li
              className={"list-group-item navbar-rss"}
              style={{ width: "130px" }}
            >
              <a href="https://github.com/AnnaKh85" target={"_blank"}>
                {t("author")}:&nbsp;<i className="bi bi-github"></i>
              </a>
            </li>
            <li
              className={"list-group-item navbar-rss"}
              style={{ width: "100px" }}
            >
              <label>2024</label>
            </li>
            <li
              className={"list-group-item navbar-rss"}
              style={{ width: "100px" }}
            >
              <a href="https://rs.school/react/" target={"_blank"}>
                <img
                  src="/rss-logo.svg"
                  className={"img-fluid"}
                  alt="course logo"
                  width="28"
                  height="28"
                  style={{
                    aspectRatio: "auto",
                    border: "1px",
                    borderStyle: "solid",
                    borderRadius: "3px",
                  }}
                />
              </a>
            </li>
            <li
              className={"list-group-item navbar-rss"}
              style={{ width: "300px" }}
            >
              {t("project")}:
              <span className={"ms-1"} style={{ fontWeight: "bolder" }}>
                REST/GraphiQL Client
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
