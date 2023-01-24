(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function c(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=c(o);fetch(o.href,n)}})();let f;const v=new Uint8Array(16);function L(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(v)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function C(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const S=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:S};function E(e,t,c){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const d=e.random||(e.rng||L)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){c=c||0;for(let o=0;o<16;++o)t[c+o]=d[o];return t}return C(d)}class k{constructor(t){this.id=E(),this.description=t,this.done=!1,this.createdAt=new Date}}const i={All:"All",Completed:"Completed",Pending:"Pending"},l={todos:[],filter:i.All},A=()=>{T(),console.log("InitStore")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=i.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},g=()=>{const e=JSON.stringify(l);localStorage.setItem("state",e)},P=(e=i.All)=>{switch(e){case i.All:return[...l.todos];case i.Completed:return l.todos.filter(t=>t.done);case i.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} isn't valid`)}},I=e=>{if(!e)throw new Error("Description is required");l.todos.push(new k(e)),g()},U=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},x=e=>{l.todos=l.todos.filter(t=>t.id!==e),g()},N=()=>{l.todos=l.todos.filter(e=>!e.done),g()},O=(e=i.All)=>{if(!Object.keys(i).includes(e))throw new Error(`The filter ${e} is not valid`);l.filter=e,g()},q=()=>l.filter.toString(),a={addTodo:I,deleteCompleted:N,deleteTodo:x,getCurrentFilter:q,getTodos:P,initStore:A,loadStroe:T,setFilter:O,toggleTodo:U},D=`<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
    </header>
    
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a class="selected filtro" class="selected" href="#/">Todos</a>
            </li>
            <li>
                <a class="filtro" href="#/active">Pendientes</a>
            </li>
            <li>
                <a class="filtro" href="#/completed">Completados</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Creado por <a href="http://todomvc.com">ti</a></p>
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`,M=e=>{if(!e)throw new Error("A TODO Object is required");const{done:t,id:c,description:d}=e,o=`
            <div class="view">
                <input class="toggle" type="checkbox" ${t?"checked":""}>
                <label>${d}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",c),e.done&&n.classList.add("completed"),n};let y;const F=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=a.getTodos(i.Pending).length};let h;const H=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(c=>{h.append(M(c))})},m={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},V=e=>{const t=()=>{const s=a.getTodos(a.getCurrentFilter());H(m.TodoList,s),c()},c=()=>{F(m.PendingCountLabel)};(()=>{const s=document.createElement("div");s.innerHTML=D,document.querySelector(e).append(s),t()})();const d=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.ClearCompleted),p=document.querySelectorAll(m.TodoFilters);d.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(a.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const u=s.target.closest("[data-id]");a.toggleTodo(u.getAttribute("data-id")),t()}),o.addEventListener("click",s=>{const u=s.target.closest("[data-id]");!u||s.target.className!=="destroy"||(a.deleteTodo(u.getAttribute("data-id")),t())}),n.addEventListener("click",s=>{s.target.className==="clear-completed"&&(a.deleteCompleted(),t())}),p.forEach(s=>{s.addEventListener("click",u=>{switch(p.forEach(w=>w.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":a.setFilter(i.All);break;case"Pendientes":a.setFilter(i.Pending);break;case"Completados":a.setFilter(i.Completed);break}t()})})};a.initStore();V("#app");
