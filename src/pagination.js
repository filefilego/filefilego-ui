const PAGINATION_LIMIT = 100;
const API_ENDPOINT = "https://api/";
// https://laravel.com/docs/5.6/pagination
// http://keyvanfatehi.com/2016/07/27/Implementing-Link-Header-Pagination-on-the-Node-js-Server/
// https://api.github.com/repos/vmg/redcarpet/issues?state=closed&?page=2&per_page=1
// <https://api.github.com/repositories/1523106/issues?state=closed&%3Fpage=2&per_page=1&page=2>; rel="next", <https://api.github.com/repositories/1523106/issues?state=closed&%3Fpage=2&per_page=1&page=582>; rel="last"
class Pagination {
  include_metadata = false;
  page = 0;
  per_page = 0;
  last_page = 0;

  previous_page = null;
  next_page = null;

  previous_page_url = null;
  next_page_url = null;
  first_page_url = null;
  last_page_url = null;

  offset = 0;
  result = [];
  total = 0;
  originalUrl = "";

  constructor(req) {
    this.originalUrl = req.originalUrl;
    this.include_metadata = req.query.include_metadata === "true";
    this.per_page = parseInt(req.query.per_page) || parseInt(PAGINATION_LIMIT);
    this.page = parseInt(req.query.page);
    this.offset = parseInt(this.per_page * (this.page - 1));

    if (isNaN(this.per_page) || this.per_page >= PAGINATION_LIMIT) {
      this.per_page = parseInt(PAGINATION_LIMIT);
      this.offset = parseInt(this.per_page * (this.page - 1));
    }

    if (isNaN(this.page) || this.page <= 0) {
      this.page = 1;
      this.offset = 0;
    }

    this.url = new URL(`${API_ENDPOINT}${req.originalUrl}`);
  }

  linkHeader() {
    let links = [];
    if (this.previous_page_url) {
      links.push(`<${this.previous_page_url}>; rel="prev"`);
    }

    if (this.next_page_url) {
      links.push(`<${this.next_page_url}>; rel="next"`);
    }

    if (this.last_page_url) {
      links.push(`<${this.last_page_url}>; rel="last"`);
    }

    if (this.first_page_url) {
      links.push(`<${this.first_page_url}>; rel="first"`);
    }
    return links.join(",");
  }

  paginate(data) {
    // set the last page
    this.total = data.count;
    this.result = data.rows;
    this.last_page = Math.ceil(this.total / this.per_page);

    // if page is greater than 1 and lastpage isnot equal to page
    if (this.page > 1) {
      this.previous_page = this.page - 1;
    }

    // if page is smaller than last page
    if (this.page < this.last_page) {
      this.next_page = this.page + 1;
    }

    this.previous_page_url = this.previous_page
      ? this.setUrlPageNumber(this.previous_page)
      : null;
    this.next_page_url = this.next_page
      ? this.setUrlPageNumber(this.next_page)
      : null;
    this.first_page_url = this.setUrlPageNumber(1);
    this.last_page_url = this.setUrlPageNumber(this.last_page);
    return this;
  }

  setUrlPageNumber(pagenumber) {
    this.url.searchParams.set("page", pagenumber);
    return this.url.search;
  }

  setUrlPageNumberForRange(pagenumber) {
    this.url.searchParams.set("page", pagenumber);
    return this.url.search;
  }

  payload() {
    if (this.include_metadata) {
      return {
        uri: this.url.origin + this.url.pathname,
        total: this.total,
        per_page: this.per_page,
        page: this.page,
        last_page: this.last_page,
        previous_page_url: this.previous_page_url,
        next_page_url: this.next_page_url, //this.last_page <= this.page ? null : 'next',
        first_page_url: this.first_page_url,
        last_page_url: this.last_page_url,
        range: this.paginationRange(),
        data: this.result,
      };
    }
    return this.result;
  }

  extractPaginationData() {
    return {
      limit: this.per_page,
      offset: this.offset,
    };
  }

  paginationRange() {
    let c = this.page,
      m = this.last_page;

    var delta = 2,
      range = [],
      rangeWithDots = [],
      l;

    range.push(1);
    for (let i = c - delta; i <= c + delta; i++) {
      if (i < m && i > 1) {
        range.push(i);
      }
    }
    if (m != 1) range.push(m);

    //range.push(m)

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots.map((o) => {
      return { page: o, params: this.setUrlPageNumberForRange(o) };
    });
  }
}

export default {
  Pagination,
};
