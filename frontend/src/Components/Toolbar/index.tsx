import React from "react";
import ViewListIcon from "@material-ui/icons/ViewList";
import AppsIcon from "@material-ui/icons/Apps";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import "./toolbar.scss";

function Toolbar({ pages, currentPage }: {pages: number, currentPage: number}) {
    const pagesHtml = (pages: number, currentPage: number) => {
        let html = [];
        for (let index = 1; index <= pages; index++) {
            html.push(
                <li
                    className={`page ${index === currentPage ? "current" : ""}`}
                    key={`page-${index}`}
                >
                    <button>{index}</button>
                </li>
            );
        }

        return html;
    };

    return (
        <div className="toolbar">
            <div className="view-selector">
                <button className="action icon-link grid-view active">
                    <AppsIcon className="icon" />
                </button>

                <button className="action icon-link list-view">
                    <ViewListIcon className="icon" />
                </button>
            </div>

            {pages && (
                <div className="pager">
                    <button className="action icon-link prev">
                        <ChevronLeftIcon className="icon" />
                    </button>
                    <ul className="pages">{pagesHtml(pages, currentPage)}</ul>
                    <button className="action icon-link next">
                        <ChevronRightIcon className="icon" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Toolbar;
