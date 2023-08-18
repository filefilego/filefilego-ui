<template>
    <div style="padding-bottom: 20px;">
      <window-header></window-header>
      <div class="area" style="padding-bottom: 12px; padding-top: 21px; background-color: rgb(62, 21, 202); text-align: center;">
          <ul class="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
          </ul>
          <div>
            <img style="height: 72px; background-color: white; width: 72px; border-radius: 50%;" src="/assets/icon.png" />
          </div>
          <div style="margin-top:13px;">
              <span class="app-header" style="color: #fff;"> FILEFILEGO</span>
          </div>
          <div style="margin-top:13px; padding-bottom: 13px;">
              <span class="app-header" style="color: #fff;">Decentralized Data Sharing Network</span>
          </div> 
  
        <!-- Hello world
        <input type="button" @click="run"  value="Run" /> -->
      </div>
  
      <div style="text-align: center; margin-top: 20px;">
          <div>
           <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60pt" height="60pt" version="1.1" viewBox="0 0 700 700"> <defs> <symbol id="v" overflow="visible"> <path d="m26.797-1.6094c-1.375 0.71875-2.8125 1.2617-4.3125 1.625s-3.0625 0.54688-4.6875 0.54688c-4.8555 0-8.7031-1.3516-11.547-4.0625-2.8359-2.7188-4.25-6.3984-4.25-11.047 0-4.6641 1.4141-8.3516 4.25-11.062 2.8438-2.7188 6.6914-4.0781 11.547-4.0781 1.625 0 3.1875 0.18359 4.6875 0.54688 1.5 0.36719 2.9375 0.90625 4.3125 1.625v6.0312c-1.3984-0.94531-2.7734-1.6406-4.125-2.0781-1.3555-0.44531-2.7773-0.67188-4.2656-0.67188-2.6875 0-4.8047 0.85938-6.3438 2.5781-1.5312 1.7188-2.2969 4.0898-2.2969 7.1094 0 3 0.76562 5.3594 2.2969 7.0781 1.5391 1.7188 3.6562 2.5781 6.3438 2.5781 1.4883 0 2.9102-0.21875 4.2656-0.65625 1.3516-0.44531 2.7266-1.1445 4.125-2.0938z"/> </symbol> <symbol id="d" overflow="visible"> <path d="m19.609-15.922c-0.61719-0.28125-1.2266-0.48828-1.8281-0.625-0.60547-0.14453-1.2148-0.21875-1.8281-0.21875-1.793 0-3.1719 0.57812-4.1406 1.7344s-1.4531 2.8086-1.4531 4.9531v10.078h-7v-21.875h7v3.5938c0.89453-1.4375 1.9258-2.4844 3.0938-3.1406 1.1641-0.65625 2.5625-0.98438 4.1875-0.98438 0.22656 0 0.47656 0.011719 0.75 0.03125 0.28125 0.023438 0.67969 0.0625 1.2031 0.125z"/> </symbol> <symbol id="c" overflow="visible"> <path d="m25.203-11v2h-16.359c0.17578 1.6367 0.76953 2.8672 1.7812 3.6875 1.0195 0.82422 2.4414 1.2344 4.2656 1.2344 1.4688 0 2.9727-0.21875 4.5156-0.65625 1.5391-0.4375 3.125-1.0977 4.75-1.9844v5.3906c-1.6484 0.625-3.2969 1.0938-4.9531 1.4062-1.6562 0.32031-3.3125 0.48438-4.9688 0.48438-3.9609 0-7.0391-1.0039-9.2344-3.0156-2.1875-2.0078-3.2812-4.832-3.2812-8.4688 0-3.5625 1.0781-6.3633 3.2344-8.4062 2.1562-2.0508 5.1172-3.0781 8.8906-3.0781 3.4375 0 6.1875 1.0391 8.25 3.1094 2.0703 2.0742 3.1094 4.8398 3.1094 8.2969zm-7.1875-2.3281c0-1.3203-0.39062-2.3906-1.1719-3.2031-0.77344-0.8125-1.7812-1.2188-3.0312-1.2188-1.3555 0-2.4609 0.38281-3.3125 1.1406-0.84375 0.76172-1.3711 1.8555-1.5781 3.2812z"/> </symbol> <symbol id="f" overflow="visible"> <path d="m13.172-9.8438c-1.4609 0-2.5586 0.25-3.2969 0.75-0.74219 0.49219-1.1094 1.2148-1.1094 2.1719 0 0.88672 0.29688 1.5859 0.89062 2.0938 0.59375 0.5 1.4141 0.75 2.4688 0.75 1.3203 0 2.4297-0.47266 3.3281-1.4219 0.89453-0.94531 1.3438-2.1289 1.3438-3.5469v-0.79688zm10.672-2.6406v12.484h-7.0469v-3.25c-0.9375 1.3359-1.9961 2.3047-3.1719 2.9062-1.168 0.60156-2.5898 0.90625-4.2656 0.90625-2.2734 0-4.1172-0.66016-5.5312-1.9844-1.4062-1.3203-2.1094-3.0352-2.1094-5.1406 0-2.5625 0.87891-4.4414 2.6406-5.6406 1.7695-1.1953 4.5391-1.7969 8.3125-1.7969h4.125v-0.54688c0-1.1133-0.4375-1.9258-1.3125-2.4375-0.86719-0.50781-2.2266-0.76562-4.0781-0.76562-1.5 0-2.8984 0.15234-4.1875 0.45312-1.2812 0.29297-2.4766 0.74219-3.5781 1.3438v-5.3438c1.4883-0.36328 2.9883-0.64062 4.5-0.82812 1.5078-0.1875 3.0195-0.28125 4.5312-0.28125 3.9453 0 6.7969 0.78125 8.5469 2.3438 1.75 1.5547 2.625 4.0781 2.625 7.5781z"/> </symbol> <symbol id="b" overflow="visible"> <path d="m11-28.094v6.2188h7.2031v5h-7.2031v9.2812c0 1.0117 0.19531 1.6992 0.59375 2.0625 0.40625 0.35547 1.207 0.53125 2.4062 0.53125h3.5938v5h-5.9844c-2.7617 0-4.7188-0.57031-5.875-1.7188-1.1562-1.1562-1.7344-3.1133-1.7344-5.875v-9.2812h-3.4688v-5h3.4688v-6.2188z"/> </symbol> <symbol id="k" overflow="visible"> <path d="m18.25-18.672v-11.719h7.0312v30.391h-7.0312v-3.1719c-0.96875 1.293-2.0312 2.2422-3.1875 2.8438-1.1562 0.59375-2.5 0.89062-4.0312 0.89062-2.6875 0-4.9023-1.0664-6.6406-3.2031-1.7305-2.1445-2.5938-4.9062-2.5938-8.2812s0.86328-6.1289 2.5938-8.2656c1.7383-2.1445 3.9531-3.2188 6.6406-3.2188 1.5078 0 2.8477 0.30469 4.0156 0.90625 1.1641 0.60547 2.2344 1.5469 3.2031 2.8281zm-4.6094 14.156c1.4883 0 2.6289-0.54688 3.4219-1.6406 0.78906-1.0938 1.1875-2.6797 1.1875-4.7656 0-2.082-0.39844-3.6719-1.1875-4.7656-0.79297-1.0938-1.9336-1.6406-3.4219-1.6406-1.4922 0-2.6328 0.54688-3.4219 1.6406-0.78125 1.0938-1.1719 2.6836-1.1719 4.7656 0 2.0859 0.39062 3.6719 1.1719 4.7656 0.78906 1.0938 1.9297 1.6406 3.4219 1.6406z"/> </symbol> <symbol id="e" overflow="visible"> <path d="m15-4.5156c1.5 0 2.6406-0.54688 3.4219-1.6406 0.78906-1.0938 1.1875-2.6797 1.1875-4.7656 0-2.082-0.39844-3.6719-1.1875-4.7656-0.78125-1.0938-1.9219-1.6406-3.4219-1.6406s-2.6523 0.55469-3.4531 1.6562c-0.79297 1.0938-1.1875 2.6797-1.1875 4.75 0 2.0742 0.39453 3.6641 1.1875 4.7656 0.80078 1.0938 1.9531 1.6406 3.4531 1.6406zm-4.6406-14.156c0.95703-1.2812 2.0195-2.2227 3.1875-2.8281 1.1758-0.60156 2.5234-0.90625 4.0469-0.90625 2.6953 0 4.9102 1.0742 6.6406 3.2188 1.7383 2.1367 2.6094 4.8906 2.6094 8.2656s-0.87109 6.1367-2.6094 8.2812c-1.7305 2.1367-3.9453 3.2031-6.6406 3.2031-1.5234 0-2.8711-0.30469-4.0469-0.90625-1.168-0.60156-2.2305-1.5469-3.1875-2.8281v3.1719h-7v-30.391h7z"/> </symbol> <symbol id="j" overflow="visible"> <path d="m0.48438-21.875h7l5.875 14.844 5-14.844h7l-9.2031 23.953c-0.92969 2.4258-2.0078 4.125-3.2344 5.0938-1.2305 0.97656-2.8555 1.4688-4.875 1.4688h-4.0469v-4.5938h2.1875c1.1875 0 2.0508-0.19531 2.5938-0.57812 0.53906-0.375 0.96094-1.0469 1.2656-2.0156l0.1875-0.60938z"/> </symbol> <symbol id="i" overflow="visible"> <path d="m11.188-23.484v17.797h2.7031c3.0703 0 5.4141-0.75781 7.0312-2.2812 1.625-1.5195 2.4375-3.7344 2.4375-6.6406 0-2.8945-0.80859-5.0977-2.4219-6.6094-1.6172-1.5078-3.9648-2.2656-7.0469-2.2656zm-7.5156-5.6719h7.9375c4.4258 0 7.7227 0.32031 9.8906 0.95312 2.1641 0.625 4.0234 1.6953 5.5781 3.2031 1.3633 1.3125 2.375 2.8281 3.0312 4.5469 0.66406 1.7188 1 3.668 1 5.8438 0 2.1992-0.33594 4.1641-1 5.8906-0.65625 1.7188-1.668 3.2422-3.0312 4.5625-1.5625 1.5117-3.4375 2.5859-5.625 3.2188-2.1875 0.625-5.4688 0.9375-9.8438 0.9375h-7.9375z"/> </symbol> <symbol id="u" overflow="visible"> <path d="m3.3594-21.875h7v21.875h-7zm0-8.5156h7v5.7031h-7z"/> </symbol> <symbol id="h" overflow="visible"> <path d="m25.359-13.328v13.328h-7.0312v-10.203c0-1.8828-0.046875-3.1797-0.14062-3.8906-0.085938-0.71875-0.23047-1.25-0.4375-1.5938-0.27344-0.45703-0.64062-0.8125-1.1094-1.0625s-1-0.375-1.5938-0.375c-1.4609 0-2.6055 0.5625-3.4375 1.6875-0.83594 1.125-1.25 2.6836-1.25 4.6719v10.766h-7v-21.875h7v3.2031c1.0508-1.2812 2.1641-2.2227 3.3438-2.8281 1.1875-0.60156 2.5-0.90625 3.9375-0.90625 2.5195 0 4.4375 0.77734 5.75 2.3281 1.3125 1.5547 1.9688 3.8047 1.9688 6.75z"/> </symbol> <symbol id="a" overflow="visible"> <path d="m13.766-17.406c-1.543 0-2.7266 0.55859-3.5469 1.6719-0.8125 1.1172-1.2188 2.7188-1.2188 4.8125s0.40625 3.6992 1.2188 4.8125c0.82031 1.1172 2.0039 1.6719 3.5469 1.6719 1.5312 0 2.6953-0.55469 3.5-1.6719 0.8125-1.1133 1.2188-2.7188 1.2188-4.8125s-0.40625-3.6953-1.2188-4.8125c-0.80469-1.1133-1.9688-1.6719-3.5-1.6719zm0-5c3.7695 0 6.7109 1.0156 8.8281 3.0469 2.1133 2.0312 3.1719 4.8438 3.1719 8.4375s-1.0586 6.4062-3.1719 8.4375c-2.1172 2.0312-5.0586 3.0469-8.8281 3.0469-3.7734 0-6.7266-1.0156-8.8594-3.0469-2.125-2.0312-3.1875-4.8438-3.1875-8.4375s1.0625-6.4062 3.1875-8.4375c2.1328-2.0312 5.0859-3.0469 8.8594-3.0469z"/> </symbol> <symbol id="t" overflow="visible"> <path d="m20.453-21.188v5.3125c-1.5-0.625-2.9492-1.0938-4.3438-1.4062-1.3867-0.3125-2.6992-0.46875-3.9375-0.46875-1.3359 0-2.3242 0.16797-2.9688 0.5-0.63672 0.32422-0.95312 0.83594-0.95312 1.5312 0 0.55469 0.23828 0.98047 0.71875 1.2812 0.48828 0.30469 1.3672 0.52734 2.6406 0.67188l1.2188 0.17188c3.582 0.46094 5.9922 1.2109 7.2344 2.25 1.2383 1.043 1.8594 2.6719 1.8594 4.8906 0 2.3359-0.85938 4.0898-2.5781 5.2656-1.7188 1.168-4.2891 1.75-7.7031 1.75-1.4492 0-2.9453-0.11719-4.4844-0.34375-1.543-0.22656-3.125-0.56641-4.75-1.0156v-5.3125c1.3945 0.67969 2.8203 1.1875 4.2812 1.5312 1.4688 0.33594 2.957 0.5 4.4688 0.5 1.3633 0 2.3906-0.1875 3.0781-0.5625 0.69531-0.38281 1.0469-0.94531 1.0469-1.6875 0-0.625-0.24219-1.0859-0.71875-1.3906-0.48047-0.3125-1.4297-0.55078-2.8438-0.71875l-1.2344-0.15625c-3.1055-0.39453-5.2812-1.1172-6.5312-2.1719-1.25-1.0508-1.875-2.6484-1.875-4.7969 0-2.3203 0.78906-4.0391 2.375-5.1562 1.5938-1.125 4.0312-1.6875 7.3125-1.6875 1.2812 0 2.6289 0.10156 4.0469 0.29688 1.4258 0.19922 2.9727 0.50781 4.6406 0.92188z"/> </symbol> <symbol id="g" overflow="visible"> <path d="m17.75-30.391v4.5938h-3.8594c-0.99219 0-1.6836 0.17969-2.0781 0.53125-0.38672 0.35547-0.57812 0.97656-0.57812 1.8594v1.5312h5.9688v5h-5.9688v16.875h-7v-16.875h-3.4688v-5h3.4688v-1.5312c0-2.375 0.66016-4.1289 1.9844-5.2656 1.332-1.1445 3.3945-1.7188 6.1875-1.7188z"/> </symbol> <symbol id="s" overflow="visible"> <path d="m3.6719-29.156h7.5156v23.469h13.203v5.6875h-20.719z"/> </symbol> <symbol id="r" overflow="visible"> <path d="m23.641-18.25c0.88281-1.3516 1.9297-2.3828 3.1406-3.0938 1.2188-0.70703 2.5547-1.0625 4.0156-1.0625 2.5195 0 4.4375 0.77734 5.75 2.3281 1.3125 1.5547 1.9688 3.8047 1.9688 6.75v13.328h-7.0312v-11.406c0.007813-0.16406 0.019531-0.33594 0.03125-0.51562 0.007813-0.1875 0.015625-0.45312 0.015625-0.79688 0-1.5508-0.23047-2.6719-0.6875-3.3594-0.46094-0.69531-1.1953-1.0469-2.2031-1.0469-1.3359 0-2.3672 0.54688-3.0938 1.6406-0.71875 1.0938-1.0898 2.6719-1.1094 4.7344v10.75h-7.0312v-11.406c0-2.4258-0.21094-3.9844-0.625-4.6719-0.41797-0.69531-1.1641-1.0469-2.2344-1.0469-1.3359 0-2.3672 0.55469-3.0938 1.6562-0.73047 1.0938-1.0938 2.6641-1.0938 4.7031v10.766h-7.0312v-21.875h7.0312v3.2031c0.85156-1.2383 1.8359-2.1719 2.9531-2.7969 1.1133-0.625 2.3438-0.9375 3.6875-0.9375 1.5078 0 2.8438 0.36719 4 1.0938 1.1562 0.73047 2.0352 1.75 2.6406 3.0625z"/> </symbol> <symbol id="q" overflow="visible"> <path d="m25.359-13.328v13.328h-7.0312v-10.156c0-1.9141-0.046875-3.2266-0.14062-3.9375-0.085938-0.71875-0.23047-1.25-0.4375-1.5938-0.27344-0.45703-0.64062-0.8125-1.1094-1.0625s-1-0.375-1.5938-0.375c-1.4609 0-2.6055 0.5625-3.4375 1.6875-0.83594 1.125-1.25 2.6836-1.25 4.6719v10.766h-7v-30.391h7v11.719c1.0508-1.2812 2.1641-2.2227 3.3438-2.8281 1.1875-0.60156 2.5-0.90625 3.9375-0.90625 2.5195 0 4.4375 0.77734 5.75 2.3281 1.3125 1.5547 1.9688 3.8047 1.9688 6.75z"/> </symbol> <symbol id="p" overflow="visible"> <path d="m3.6719-29.156h8.4062l10.594 20v-20h7.1406v29.156h-8.4062l-10.609-20v20h-7.125z"/> </symbol> <symbol id="o" overflow="visible"> <path d="m3.125-8.5156v-13.359h7.0312v2.1875c0 1.1875-0.007812 2.6797-0.015625 4.4688-0.011719 1.7812-0.015625 2.9766-0.015625 3.5781 0 1.7617 0.039062 3.0273 0.125 3.7969 0.09375 0.77344 0.25 1.3359 0.46875 1.6875 0.28906 0.46094 0.66406 0.8125 1.125 1.0625 0.46875 0.24219 1 0.35938 1.5938 0.35938 1.457 0 2.6016-0.55469 3.4375-1.6719 0.83203-1.125 1.25-2.6797 1.25-4.6719v-10.797h7v21.875h-7v-3.1719c-1.0547 1.2812-2.168 2.2266-3.3438 2.8281-1.1797 0.60156-2.4805 0.90625-3.9062 0.90625-2.5234 0-4.4453-0.76953-5.7656-2.3125-1.3242-1.5508-1.9844-3.8047-1.9844-6.7656z"/> </symbol> <symbol id="n" overflow="visible"> <path d="m3.6719-29.156h12.484c3.707 0 6.5508 0.82422 8.5312 2.4688 1.9883 1.6484 2.9844 3.9922 2.9844 7.0312 0 3.0625-0.99609 5.418-2.9844 7.0625-1.9805 1.6484-4.8242 2.4688-8.5312 2.4688h-4.9688v10.125h-7.5156zm7.5156 5.4375v8.1562h4.1719c1.457 0 2.582-0.35156 3.375-1.0625 0.78906-0.71875 1.1875-1.7266 1.1875-3.0312 0-1.3008-0.39844-2.3008-1.1875-3-0.79297-0.70703-1.918-1.0625-3.375-1.0625z"/> </symbol> <symbol id="m" overflow="visible"> <path d="m3.3594-21.875h7v21.484c0 2.9258-0.70312 5.1602-2.1094 6.7031-1.4062 1.5508-3.4492 2.3281-6.125 2.3281h-3.4531v-4.5938h1.2031c1.332 0 2.2422-0.30469 2.7344-0.90625 0.5-0.59375 0.75-1.7734 0.75-3.5312zm0-8.5156h7v5.7031h-7z"/> </symbol> <symbol id="l" overflow="visible"> <path d="m21.031-21.188v5.7031c-0.94922-0.65625-1.9023-1.1406-2.8594-1.4531-0.96094-0.3125-1.9492-0.46875-2.9688-0.46875-1.9609 0-3.4844 0.57422-4.5781 1.7188-1.0859 1.1367-1.625 2.7266-1.625 4.7656 0 2.043 0.53906 3.6367 1.625 4.7812 1.0938 1.1367 2.6172 1.7031 4.5781 1.7031 1.0938 0 2.1289-0.16016 3.1094-0.48438 0.97656-0.32031 1.8828-0.80469 2.7188-1.4531v5.7344c-1.0938 0.39844-2.2031 0.69141-3.3281 0.89062-1.125 0.20703-2.2578 0.3125-3.3906 0.3125-3.9375 0-7.0234-1.0078-9.25-3.0312-2.2305-2.0312-3.3438-4.8477-3.3438-8.4531 0-3.6016 1.1133-6.4141 3.3438-8.4375 2.2266-2.0312 5.3125-3.0469 9.25-3.0469 1.1445 0 2.2734 0.10547 3.3906 0.3125 1.1133 0.19922 2.2227 0.5 3.3281 0.90625z"/> </symbol> </defs> <g> <path d="m194.8 270.14c-4.3945 0.41406-7.7109 4.0547-7.7109 8.4688v32.531c0 4.4297 3.3203 8.0703 7.7109 8.4688l36.008 3.75c3.1992 14.07 8.7305 27.406 16.438 40.234l-22.816 27.547c-2.8164 3.4062-2.5859 8.3281 0.53516 11.438l23 23c3.1094 3.1172 8.0234 3.3672 11.441 0.53906l28.121-22.828c12.254 7.7188 25.598 13.25 40.07 16.859l3.3398 35.594c0.41406 4.3984 4.0547 7.7109 8.4688 7.7109h32.527c4.418 0 8.0586-3.3203 8.4688-7.7109l3.75-36.008c14.062-3.1953 27.406-8.7266 40.242-16.438l27.543 22.828c3.4062 2.8125 8.3281 2.5703 11.434-0.54688l22.996-23c3.125-3.1094 3.3594-8.0312 0.54297-11.445l-22.824-28.117c7.7148-12.25 13.246-25.586 16.855-40.07l35.586-3.3359c4.4023-0.39844 7.7188-4.0391 7.7188-8.4688v-32.531c0-4.4141-3.3125-8.0547-7.707-8.4688l-36.008-3.7422c-3.1953-14.07-8.7305-27.414-16.438-40.242l22.812-27.539c2.8164-3.3984 2.5898-8.3125-0.53516-11.445l-23.004-23c-3.1211-3.125-8.0352-3.3594-11.438-0.53125l-28.117 22.82c-12.238-7.7109-25.582-13.242-40.07-16.859l-3.3398-35.586c-0.41016-4.3984-4.0508-7.7188-8.4688-7.7188h-32.527c-4.4141 0-8.0547 3.3125-8.4727 7.7109l-3.7461 36.016c-14.078 3.1953-27.422 8.7266-40.242 16.438l-27.535-22.82c-3.3867-2.8125-8.3086-2.5938-11.441 0.53125l-23.008 23c-3.1172 3.1328-3.3438 8.0469-0.53125 11.445l22.824 28.117c-7.7148 12.25-13.25 25.594-16.855 40.07zm43.812-1.9766c2.9922-13.18 8.1758-25.688 15.406-37.164 1.9766-3.1328 1.7305-7.1328-0.60938-9.9531l-22.789-28.219 23.684-23.031 27.543 22.828c2.8203 2.3359 6.8164 2.5703 9.9453 0.60156 11.469-7.2266 23.973-12.406 37.18-15.406 3.5977-0.82812 6.25-3.8281 6.5938-7.4688l3.8398-36.055 33.027 0.46094 3.3398 35.586c0.33594 3.6406 2.9883 6.6484 6.6055 7.4766 13.195 3 25.699 8.1797 37.172 15.406 3.1289 1.9844 7.125 1.7266 9.9453-0.60937l28.219-22.789 23.031 23.68-22.812 27.539c-2.3438 2.8203-2.5898 6.8203-0.61328 9.9531 7.2305 11.477 12.414 23.984 15.406 37.164 0.82031 3.6172 3.8203 6.2734 7.4648 6.6094l36.055 3.8359v32.531l-0.45703 0.5-35.605 3.3359c-3.6484 0.35156-6.6445 3.0156-7.457 6.6172-2.9922 13.172-8.1758 25.68-15.41 37.164-1.9688 3.1328-1.7188 7.1328 0.61328 9.9453l22.785 28.219-23.684 23.039-27.527-22.82c-2.8281-2.3438-6.8281-2.6016-9.957-0.61719-11.484 7.2344-23.988 12.422-37.164 15.414-3.6133 0.8125-6.2695 3.8125-6.6094 7.4609l-3.8398 36.055-33.031-0.46094-3.3398-35.594c-0.34375-3.6484-3-6.6484-6.6016-7.4609-13.18-2.9922-25.684-8.1797-37.172-15.414-1.4102-0.89063-2.9922-1.3281-4.5664-1.3281-1.9258 0-3.832 0.65625-5.3789 1.9453l-28.219 22.781-23.031-23.68 22.812-27.539c2.3359-2.8125 2.5859-6.8125 0.61328-9.9531-7.2305-11.477-12.414-23.984-15.406-37.164-0.82031-3.6016-3.8164-6.2578-7.4648-6.6094l-36.059-3.8359 0.46094-33.031 35.59-3.3359c3.6445-0.33594 6.6445-2.9922 7.4727-6.6094z"/> <path d="m355.66 376.95c29.23 0 56.457-15.727 71.043-41.023 7.4883-12.852 11.301-27.586 11.023-42.609v-0.007812c-0.82812-44.516-37.59-80.516-82.086-80.516h-0.57812c-44.93 0.32812-81.48 37.148-81.48 82.078 0 14.461 3.8008 28.664 10.992 41.094 14.652 25.281 41.891 40.984 71.086 40.984zm-0.54297-156.16h0.52344c40.156 0 73.34 32.492 74.086 72.664 0.25 13.562-3.1836 26.852-9.9453 38.453-13.172 22.844-37.742 37.039-64.121 37.039-26.352 0-50.938-14.18-64.164-36.992-6.4844-11.211-9.9141-24.031-9.9141-37.086 0-40.555 32.988-73.781 73.535-74.078z"/> <path d="m580.95 390.02c12.477-29.836 18.801-61.492 18.801-94.094 0-131.43-104.43-238.87-234.66-243.84l25.254-25.254c1.5625-1.5625 1.5625-4.0938 0-5.6562s-4.0938-1.5625-5.6562 0l-31.84 31.84c-0.36719 0.36719-0.66406 0.80469-0.86719 1.293-0.20312 0.48047-0.3125 1.0039-0.3125 1.5391s0.10938 1.0586 0.3125 1.5391c0.20312 0.48828 0.5 0.92578 0.86719 1.293l31.84 31.832c0.78125 0.78125 1.8047 1.1719 2.8281 1.1719 1.0234 0 2.0469-0.39063 2.8281-1.1719 1.5625-1.5625 1.5625-4.0938 0-5.6562l-24.762-24.754c125.59 5.2148 226.17 108.97 226.17 235.82 0 31.539-6.1172 62.156-18.184 91-0.85156 2.0391 0.10938 4.3828 2.1484 5.2344 0.50391 0.21094 1.0273 0.3125 1.543 0.3125 1.5625 0 3.0469-0.92188 3.6914-2.4531z"/> <path d="m562.11 425.93 9.2617 34.562c0.48047 1.7812 2.0938 2.9609 3.8594 2.9609 0.34375 0 0.69141-0.046875 1.0391-0.13281 2.1328-0.57812 3.3984-2.7656 2.8281-4.9062l-11.609-43.316c-0.23828-1.0469-0.86719-2.0039-1.8711-2.582-0.69922-0.40234-1.457-0.5-2.1992-0.46484-0.29297 0.007812-0.58203-0.027344-0.875 0.042968l-43.492 11.652c-2.1328 0.57812-3.3984 2.7656-2.8281 4.9062 0.57422 2.125 2.7656 3.3594 4.8984 2.8281l33.75-9.0469c-43.164 67.777-118.53 109.56-199.21 109.56-72.402 0-139.8-32.547-184.9-89.289-1.3867-1.7266-3.8945-2.0234-5.6211-0.64063-1.7305 1.375-2.0195 3.8906-0.64453 5.625 46.633 58.656 116.31 92.305 191.16 92.305 83.723 0 161.91-43.523 206.45-114.07z"/> <path d="m100.39 403.27c-0.57031 2.1406 0.69531 4.3281 2.8281 4.9062l43.496 11.656c0.28125 0.070313 0.57031 0.097656 0.85938 0.10938 0.050781 0.003906 0.09375 0.039062 0.14453 0.039062 0.67969 0 1.3672-0.17187 2-0.53906 0.003906-0.003906 0.007812-0.007812 0.011719-0.007812 0.003906-0.003907 0.015625 0 0.019531-0.003907 0.91797-0.52344 1.5898-1.3984 1.8633-2.4219l11.656-43.5c0.57031-2.1406-0.69531-4.3281-2.8281-4.9062-2.125-0.52344-4.3242 0.70312-4.8984 2.8281l-9.0547 33.793c-17.559-33.574-26.902-71.113-26.902-109.29 0-117.45 87.613-218.01 203.8-233.9 2.1875-0.29688 3.7188-2.3125 3.4219-4.5-0.30469-2.1992-2.3398-3.6992-4.5078-3.4258-120.12 16.422-210.71 120.38-210.71 241.82 0 39.77 9.8125 78.863 28.234 113.77l-34.531-9.2578c-2.1289-0.50781-4.3281 0.70312-4.8984 2.8281z"/> </g> </svg>
          </div>
          <span class="app-header2">Configure {{ node_type == 'superlight' ? 'Super Light Node' : 'Storage Node' }}</span>
          <br />

          <div style="margin-top:20px;" class="uk-grid-match uk-child-width-expand@s uk-text-center" uk-grid>
              <div>
                  <div class="uk-card uk-card-default uk-card-body">
                    <div style="margin-top:10px; padding:20px;">
                      <span style="background-color: rgb(62, 21, 202);" class="uk-badge">1</span> <br />
                      <span class="uk-text-default" style="color:#000; font-weight: 500;">
                        Select your download folder where data will be downloaded to:
                      </span>
                      <br />
                      <div style="margin-top:10px;">
                        <button @click="chooseDir('downloadDir')" style="text-transform: none;" class="uk-button uk-button-default" type="button">
                          Select Download Folder
                          <span class="uk-icon" uk-icon="icon:  arrow-down"></span>
                        </button>
                      </div>

                    <div class="uk-text-truncate" v-if="downloadsFolder!= ''"  style="margin-top:10px;">
                      <span class="normal-txt">
                      Downloads folder: {{ downloadsFolder }}
                      </span>
                    </div>
                    </div>
                  </div>
              </div>
              <div v-if="node_type == 'storage'">
                  <div class="uk-card uk-card-default uk-card-body">
                    <div style="margin-top:10px; padding:20px;">
                      <span style="background-color: rgb(62, 21, 202);" class="uk-badge">2</span> <br />
                      <span class="uk-text-default" style="color:#000; font-weight: 500;">
                        Select your storage folder where data will be saved to:
                      </span>
                      <br />
                      <div style="margin-top:10px;">
                        <button @click="chooseDir('storage')" style="text-transform: none;" class="uk-button uk-button-default" type="button">
                          Select Storage Folder
                          <span class="uk-icon" uk-icon="icon:  folder"></span>
                        </button>
                      </div>

                    <div class="uk-text-truncate" v-if="storageFolder!= ''"  style="margin-top:10px;">
                      <span class="normal-txt">
                      Storage folder: {{ storageFolder }}
                      </span>
                    </div>
                    </div>

                  </div>
              </div>

              <div v-if="node_type == 'storage'">
                  <div class="uk-card uk-card-default uk-card-body">
                    <div style="margin-top:10px; padding:20px;">
                      <span style="background-color: rgb(62, 21, 202);" class="uk-badge">3</span> <br />
                      <span class="uk-text-default" style="color:#000; font-weight: 500;">
                        Do you want to allow everyone to store data on this computer?
                      </span>
                      <br />
                      <div style="margin-top:6px;">
                        <label style="font-weight: 500; color:#000;"><input v-model="storagePublic" class="uk-checkbox" type="checkbox" checked> Yes</label>
                      </div>
                    </div>

                  </div>
              </div>
          </div>

          <div v-if="node_type == 'storage'" style="margin-top:20px;" class="uk-grid-match uk-child-width-expand@s uk-text-center" uk-grid> 
            <div>
                  <div class="uk-card uk-card-default uk-card-body">
                    <div style="margin-top:10px; padding:20px;">
                      <span style="background-color: rgb(62, 21, 202);" class="uk-badge">3</span> <br />
                      <span class="uk-text-default" style="color:#000; font-weight: 500;">
                        Do you want to allow user-defined dynamic fees on this computer?
                      </span>
                      <br />
                      <div style="margin-top:6px;">
                        <label style="font-weight: 500; color:#000;"><input v-model="allowDynamicFees" class="uk-checkbox" type="checkbox" checked> Yes</label>
                      </div>
                    </div>

                    <div style="margin-top:10px;">
                        <span class="normal-txt">
                          If enabled, users will be allowed to set the fees for the uploaded data on this computer.
                        </span>
                      </div>

                  </div>
              </div>   
              <div>
                  <div class="uk-card uk-card-default uk-card-body">
                    <div style="margin-top:10px; padding:20px;">
                      <span style="background-color: rgb(62, 21, 202);" class="uk-badge">4</span> <br />
                      <span class="uk-text-default" style="color:#000; font-weight: 500;">
                        Generate storage access token:
                      </span>
                      <br />
                      <div style="margin-top:10px;">
                        <div class="uk-margin" uk-margin>
                          <div uk-form-custom="target: true">
                              <input v-model="storageAccessToken" class="uk-input uk-form-width-medium" type="text" placeholder="Storage access token" aria-label="Custom controls">
                          </div> or
                          <button @click="generateAccessToken(40)" style="text-transform: none;" class="uk-button uk-button-default">Generate</button>
                      </div>
                      </div>

                    <div class="uk-text-truncate" v-if="storageAccessToken!= ''"  style="margin-top:10px;">
                      <span class="normal-txt">
                       Storage Access: {{ storageAccessToken }}
                      </span>
                    </div>
                    </div>

                  </div>
              </div>

              <div>
                  <div class="uk-card uk-card-default uk-card-body">
                    <div style="margin-top:10px; padding:20px;">
                      <span style="background-color: rgb(62, 21, 202);" class="uk-badge">5</span> <br />
                      <span class="uk-text-default" style="color:#000; font-weight: 500;">
                        How much you charge per byte of data transfer:
                      </span>
                      <br />
                      <div style="margin-top:10px;">
                        <div class="uk-margin" uk-margin>
                          <div>
                              <input v-model="storageFees" class="uk-input uk-form-width-medium" type="text" placeholder="Storage fees" aria-label="Custom controls" />  <b style="color: #000;"> FFG </b>
                          </div>
                      </div>
                      </div>

                      <div style="margin-top:10px;">
                        <span class="normal-txt">
                          You will charge {{ storageFeesCalculatedGB  }} FFG for 1 GB file.
                        </span>
                        <br /><br />
                        <span v-if="errorMsg!= ''" style="color:red;"> {{ errorMsg }}</span>
                        <br v-if="errorMsg!= ''" />
                        <span class="normal-txt">
                         Please note that seting higher fees could have a negative result and downloader would ignore your requests.
                        </span>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
          <br />
          <div style="margin-top:20px;">
            <button @click="goBack" class="uk-button" style="text-transform: none; width:250px; height:50px; margin-right:20px; ">
              Back
              <span class="uk-icon" uk-icon="icon:  arrow-left"></span>
            </button>

            <button @click="finish" class="uk-button ffg-button" style="width:250px; height:50px; ">
              Finish
              <span class="uk-icon" uk-icon="icon: check"></span>
            </button>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  const { ipcRenderer } = window.require("electron");
  import { globalState, SetDownloadsPath, SetStoragePath, SetStorageAccessToken, SetStorageFees} from '../store';
  import { ref } from 'vue';
  import WindowHeader from './WindowHeader.vue'
  import { Units } from "../unit.js"
  import BigNumber from 'bignumber.js';

  export default {
    components: {
      WindowHeader,
    },
    data() {
      return {
        downloadsFolder: "",
        storageFolder: "",
        node_type: "",
        storageAccessToken: "",
        storageFees: "",
        storagePublic: false,
        allowDynamicFees: false,
        storageFeesCalculatedGB: "",
        errorMsg: ""
      }
    },
    watch: {
      storageAccessToken(newVal) {
        SetStorageAccessToken(newVal);
      },
      storageFees(newVal) {
        if(newVal== "") return;
        try{
          let oneGB = new BigNumber("1073741824", 10);
          let feesBig = Units.convert(newVal, "FFG", "FFGOne")
          let feesBigVal = new BigNumber(feesBig, 10);
          let totalFees = oneGB.mul(feesBigVal);
          this.storageFeesCalculatedGB = Units.convert(totalFees.toString(10), "FFGOne", "FFG")
          this.errorMsg = "";
          SetStorageFees(newVal)
        } catch (e) {
          this.errorMsg = e.message
        }
      }
    },
    mounted() {
      this.errorMsg = ""
      const downPath = ref(globalState.downloadsPath);
      if(downPath.value != "") {
        this.downloadsFolder = downPath.value;
      }

      const storagePath = ref(globalState.storagePath);
      if(storagePath.value != "") {
        this.storageFolder = storagePath.value;
      }

      const nodeType = ref(globalState.node_type);
      if(nodeType.value != "") {
        this.node_type = nodeType.value;
      }

      const storageAccess = ref(globalState.storageAccessToken);
      if(storageAccess.value != "") {
        this.storageAccessToken = storageAccess.value;
      }

      const storageFees = ref(globalState.storageFees);
      if(storageFees.value != "") {
        this.storageFees = storageFees.value;
      } else {
        this.storageFees = "0.0000000001";
      }
    },
    methods: {
      generateAccessToken(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }

        this.storageAccessToken = result;
        SetStorageAccessToken(this.storageAccessToken);

        return result;
      },
      chooseDir(selectType) {
        let selected = ipcRenderer.sendSync("select-dir", {})
        if(selected.filePaths && selected.filePaths.length > 0) {
          if(selectType=='downloadDir') {
            this.downloadsFolder = selected.filePaths[0];
            SetDownloadsPath(this.downloadsFolder)
          } else {
            this.storageFolder = selected.filePaths[0];
            SetStoragePath(this.storageFolder)
          }
        }
      },
      goBack() {
        this.$router.back()
      },
      finish() {
          if(this.downloadsFolder == "") {
            alert("Downloads folder is empty")
            return;
          }

          if(this.node_type != "superlight") {
              if(this.storageFolder == "") {
                alert("Storage folder is empty")
                return;
              }

              if(this.node_type == "") {
                alert("Node type is empty")
                return;
              }

              if(this.storageAccessToken == "") {
                alert("Storage access token is empty")
                return;
              }

              if(this.storageFees == "" || this.errorMsg != "") {
                alert("Storage fees is invalid")
                return;
              }
          }

          const pass = ref(globalState.password);
          if(pass.value == "") {
            alert("Node identity password is empty")
          }

          let nodeSettings = {
            password: pass.value,
            downloadsFolder: this.downloadsFolder,
            storageFolder: this.storageFolder,
            node_type: this.node_type,
            storageAccessToken: this.storageAccessToken,
            storageFees: this.storageFees,
            storagePublic: this.storagePublic,
            storage_providers: [],
            allowDynamicFees: this.allowDynamicFees
          }

          const saveRes = ipcRenderer.sendSync("save-settings", nodeSettings);
          if(saveRes.error != "") {
            alert(saveRes.error);
            return
          }

          ipcRenderer.sendSync("create-node-identity", { password: nodeSettings.password });  
          this.$router.replace("/unlock")
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  