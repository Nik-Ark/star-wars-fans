import React from 'react';
import capitalize from 'lodash.capitalize';

const SearchResultsColumn = (props) => {
    const searchResults = props.resultsEntry.results.map((result) => (
        <li key={result.url}>
            <a
                onClick={() =>
                    props.resultLinkClickHandler(result.type, result)
                }
                href={`/${result.type}/${result.id}`}
            >
                {result.title || result.name}
            </a>
        </li>
    ));
    return (
        <div className="search-column">
            <h2>{capitalize(props.resultsEntry.type)}:</h2>
            <ul>{searchResults}</ul>
        </div>
    );
};

export { SearchResultsColumn };
