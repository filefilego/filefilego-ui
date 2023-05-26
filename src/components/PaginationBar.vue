<template>
    <div>
      <ul v-show="total > 0" class="pagination">
        <li :class="canGoToFirstLast('first', 'page-item')">
          <router-link aria-label="First" class="page-link" :to="'?page=' + 1"
            ><span aria-hidden="true">««</span></router-link
          >
        </li>
        <li :class="canGoToNextPrevious('previous', page - 1, 'page-item')">
          <router-link
            aria-label="Previous"
            class="page-link"
            :to="'?page=' + (page - 1)"
            ><span aria-hidden="true">«</span></router-link
          >
        </li>
        <li
          v-show="size != 's'"
          v-for="r in range"
          :key="r.page"
          :class="getSelectedClass(r, 'page-item')"
        >
          <router-link
            v-show="r.page != '...'"
            class="page-link"
            :to="'?page=' + r.page"
          >
            {{ r.page }} <span v-show="isCurrentPage(r)" class="sr-only"></span
          ></router-link>
          <router-link v-show="r.page == '...'" class="page-link" to="#">
            {{ r.page }}
          </router-link>
        </li>
        <li class="page-item active" v-show="size == 's' && range.length > 0">
          <router-link class="page-link" :to="'?page=' + getCurrentPage().page">
            {{ getCurrentPage().page }} <span class="sr-only"></span
          ></router-link>
        </li>
        <li :class="canGoToNextPrevious('next', page + 1, 'page-item')">
          <router-link
            aria-label="Next"
            class="page-link"
            :to="'?page=' + (page + 1)"
            ><span aria-hidden="true">»</span></router-link
          >
        </li>
        <li :class="canGoToFirstLast('last', 'page-item')">
          <router-link
            aria-label="Last"
            class="page-link"
            :to="'?page=' + last_page"
            ><span aria-hidden="true">»»</span></router-link
          >
        </li>
      </ul>
    </div>
  </template>
  <script>
  export default {
    props: [
      "size",
      "range",
      "total",
      "last_page",
      "page",
      "first_page_url",
      "last_page_url",
      "previous_page_url",
      "next_page_url",
    ],
    methods: {
      getCurrentPage() {
        let cPage = this.range.filter((o) => o.page == this.page);
        return cPage.length > 0 ? cPage[0] : { params: "" };
      },
      getSelectedClass(entry, defaultClass) {
        if (entry.page == "...") return "disabled " + defaultClass;
        return this.page == entry.page ? "active " + defaultClass : defaultClass;
      },
      isCurrentPage(entry) {
        return this.page == entry.page;
      },
      canGoToNextPrevious(type, nextPrev, defaultClass) {
        let disabled = false;
        if (type == "next" && nextPrev > this.last_page) disabled = true;
        if (type == "previous" && nextPrev == 0) disabled = true;
        return disabled ? "disabled " + defaultClass : defaultClass;
      },
      canGoToFirstLast(which, defaultClass) {
        if (which == "first") {
          if (this.page == 1) return "disabled " + defaultClass;
        } else {
          if (this.page == this.last_page) return "disabled " + defaultClass;
        }
        return defaultClass;
      },
    },
  };
  </script>
  <style>
  /* pagination */
  .pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
  }
  .page-item:first-child .page-link {
    margin-left: 0;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
  .page-link:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
  .page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #745af2;
    background-color: #fff;
    border: 1px solid #dee2e6;
  }
  .pagination > li > a,
  .pagination > li > span {
    color: #263238;
    text-decoration: none;
  }
  .page-link:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
  .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #3e15ca;
    border-color: #708295;
  }
  .page-item:last-child .page-link {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
  .pagination > li > a:focus,
  .pagination > li > a:hover,
  .pagination > li > span:focus,
  .pagination > li > span:hover {
    background-color: #e9edf2;
  }
  .pagination > .active > a,
  .pagination > .active > a:focus,
  .pagination > .active > a:hover,
  .pagination > .active > span,
  .pagination > .active > span:focus,
  .pagination > .active > span:hover {
    background-color: #3e15ca;
    border-color: #3e15ca;
  }
  .page-item.disabled .page-link {
    color: #aaaaaa;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6;
  }
  </style>
  