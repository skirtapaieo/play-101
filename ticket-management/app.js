// Ticket Management Application
(function () {
    'use strict';

    // State
    let tickets = JSON.parse(JSON.stringify(DEMO_TICKETS));
    let currentView = 'tickets';
    let currentTicket = null;
    let editingTicketId = null;
    let nextId = 133;

    // DOM refs
    const ticketListView = document.getElementById('ticket-list-view');
    const ticketDetailView = document.getElementById('ticket-detail-view');
    const statsView = document.getElementById('stats-view');
    const ticketList = document.getElementById('ticket-list');
    const searchInput = document.getElementById('search-input');
    const filterPriority = document.getElementById('filter-priority');
    const filterCategory = document.getElementById('filter-category');
    const filterGroup = document.getElementById('filter-group');
    const viewTitle = document.getElementById('view-title');
    const ticketModal = document.getElementById('ticket-modal');
    const ticketForm = document.getElementById('ticket-form');
    const modalTitle = document.getElementById('modal-title');

    // Initialize
    init();

    function init() {
        renderTicketList();
        bindEvents();
    }

    // --- Event bindings ---
    function bindEvents() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-nav li').forEach(li => {
            li.addEventListener('click', () => {
                document.querySelectorAll('.sidebar-nav li').forEach(l => l.classList.remove('active'));
                li.classList.add('active');
                const view = li.dataset.view;
                switchView(view);
            });
        });

        // Search and filters
        searchInput.addEventListener('input', renderTicketList);
        filterPriority.addEventListener('change', renderTicketList);
        filterCategory.addEventListener('change', renderTicketList);
        filterGroup.addEventListener('change', renderTicketList);

        // New ticket
        document.getElementById('btn-new-ticket').addEventListener('click', openNewTicketModal);

        // Back button
        document.getElementById('btn-back').addEventListener('click', () => {
            switchView(currentView);
        });

        // Tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
            });
        });

        // Reply / Add note buttons
        document.getElementById('btn-reply').addEventListener('click', showReplyBox);
        document.getElementById('btn-cancel-reply').addEventListener('click', hideReplyBox);
        document.getElementById('btn-send-reply').addEventListener('click', sendReply);

        // Edit ticket
        document.getElementById('btn-edit-ticket').addEventListener('click', () => {
            if (currentTicket) openEditTicketModal(currentTicket);
        });

        // Modal
        document.getElementById('btn-close-modal').addEventListener('click', closeModal);
        document.getElementById('btn-cancel-form').addEventListener('click', closeModal);
        ticketForm.addEventListener('submit', handleFormSubmit);
        ticketModal.addEventListener('click', (e) => {
            if (e.target === ticketModal) closeModal();
        });
    }

    // --- View switching ---
    function switchView(view) {
        currentView = view;
        ticketListView.classList.remove('active');
        ticketDetailView.classList.remove('active');
        statsView.classList.remove('active');

        if (view === 'stats') {
            statsView.classList.add('active');
            renderStats();
        } else {
            ticketListView.classList.add('active');
            if (view === 'open') {
                viewTitle.textContent = 'Öppna ärenden';
            } else if (view === 'closed') {
                viewTitle.textContent = 'Stängda ärenden';
            } else {
                viewTitle.textContent = 'Alla ärenden';
            }
            renderTicketList();
        }
    }

    function showDetailView(ticket) {
        currentTicket = ticket;
        ticketListView.classList.remove('active');
        statsView.classList.remove('active');
        ticketDetailView.classList.add('active');
        renderTicketDetail(ticket);
    }

    // --- Rendering: Ticket List ---
    function getFilteredTickets() {
        let filtered = [...tickets];

        // View filter
        if (currentView === 'open') {
            filtered = filtered.filter(t => t.status !== 'Stängd');
        } else if (currentView === 'closed') {
            filtered = filtered.filter(t => t.status === 'Stängd');
        }

        // Search
        const search = searchInput.value.toLowerCase().trim();
        if (search) {
            filtered = filtered.filter(t =>
                t.id.toLowerCase().includes(search) ||
                t.subject.toLowerCase().includes(search) ||
                t.requester.name.toLowerCase().includes(search) ||
                t.description.toLowerCase().includes(search)
            );
        }

        // Priority filter
        if (filterPriority.value) {
            filtered = filtered.filter(t => t.priority === filterPriority.value);
        }

        // Category filter
        if (filterCategory.value) {
            filtered = filtered.filter(t => t.category === filterCategory.value);
        }

        // Group filter
        if (filterGroup.value) {
            filtered = filtered.filter(t => t.group === filterGroup.value);
        }

        return filtered;
    }

    function renderTicketList() {
        const filtered = getFilteredTickets();
        if (filtered.length === 0) {
            ticketList.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-secondary);">Inga ärenden hittades</div>';
            return;
        }

        ticketList.innerHTML = filtered.map(t => `
            <div class="ticket-row" data-id="${t.id}">
                <span class="col-id">#${t.id}</span>
                <span class="col-subject">${escapeHtml(t.subject)}</span>
                <span class="col-requester">${escapeHtml(t.requester.name)}</span>
                <span class="col-priority"><span class="priority-badge ${priorityClass(t.priority)}">${t.priority}</span></span>
                <span class="col-status"><span class="status-badge ${statusClass(t.status)}">${t.status}</span></span>
                <span class="col-handler">${t.handler || 'Ej tilldelad'}</span>
                <span class="col-date">${formatDate(t.created)}</span>
            </div>
        `).join('');

        // Click handlers
        ticketList.querySelectorAll('.ticket-row').forEach(row => {
            row.addEventListener('click', () => {
                const ticket = tickets.find(t => t.id === row.dataset.id);
                if (ticket) showDetailView(ticket);
            });
        });
    }

    // --- Rendering: Ticket Detail ---
    function renderTicketDetail(t) {
        document.getElementById('detail-ref').textContent = '#' + t.id;
        document.getElementById('detail-subject').textContent = t.subject;
        document.getElementById('detail-description-text').innerHTML = escapeHtml(t.description).replace(/\n/g, '<br>');

        // Status badge
        const badge = document.getElementById('detail-status-badge');
        badge.textContent = t.status;
        badge.className = 'status-badge ' + statusClass(t.status);

        // Time info
        const timeInfo = document.getElementById('detail-time-info');
        if (t.closed) {
            const dur = timeDiff(new Date(t.created), new Date(t.closed));
            timeInfo.textContent = 'Lösningstid: ' + dur;
        } else {
            timeInfo.textContent = 'Skapad: ' + formatDateTime(t.created);
        }

        // Requester
        const initial = t.requester.name.charAt(0);
        const color = AVATAR_COLORS[initial] || '#64748b';
        document.getElementById('detail-requester-card').innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;">
                <div class="avatar" style="background:${color}">${initial}</div>
                <div>
                    <div class="requester-name">${escapeHtml(t.requester.name)}</div>
                    <div class="requester-email">${escapeHtml(t.requester.email)}</div>
                </div>
            </div>
        `;

        // Properties
        const prioEl = document.getElementById('detail-priority');
        prioEl.textContent = t.priority;
        prioEl.className = 'priority-badge ' + priorityClass(t.priority);
        document.getElementById('detail-status').textContent = t.status;
        document.getElementById('detail-source').textContent = t.source;
        document.getElementById('detail-type').textContent = t.type;
        document.getElementById('detail-urgency').textContent = t.urgency;
        document.getElementById('detail-impact').textContent = t.impact;
        document.getElementById('detail-group').textContent = t.group || '-';
        document.getElementById('detail-handler').textContent = t.handler || 'Ej tilldelad';
        document.getElementById('detail-department').textContent = t.department;
        document.getElementById('detail-category').textContent = t.category;
        document.getElementById('detail-company').textContent = t.company;
        document.getElementById('detail-planned-start').textContent = t.plannedStart ? formatDateTime(t.plannedStart) : '-';
        document.getElementById('detail-planned-end').textContent = t.plannedEnd ? formatDateTime(t.plannedEnd) : '-';
        document.getElementById('detail-tags').textContent = t.tags.length > 0 ? t.tags.join(', ') : '-';

        // Conversations
        renderConversations(t);

        // Activity
        renderActivity(t);

        // Resolution
        const resEl = document.getElementById('resolution-content');
        if (t.resolution) {
            resEl.innerHTML = `<div class="detail-description" style="background:var(--surface);"><p>${escapeHtml(t.resolution).replace(/\n/g, '<br>')}</p></div>`;
        } else {
            resEl.innerHTML = '<p class="empty-state">Ingen lösning registrerad ännu.</p>';
        }

        // Reset tabs to first
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        document.querySelector('.tab[data-tab="details"]').classList.add('active');
        document.getElementById('tab-details').classList.add('active');

        // Hide reply box
        hideReplyBox();
    }

    function renderConversations(t) {
        const container = document.getElementById('conversations-list');
        if (t.conversations.length === 0) {
            container.innerHTML = '<p class="empty-state">Inga konversationer ännu.</p>';
            return;
        }

        container.innerHTML = t.conversations.map(c => {
            const initial = c.author.charAt(0);
            const color = AVATAR_COLORS[initial] || '#64748b';
            const isPrivate = c.type === 'private_note';
            const typeLabel = c.type === 'private_note' ? 'Privat anteckning' :
                              c.type === 'public_note' ? 'Offentlig anteckning' : '';
            const metaText = isPrivate
                ? `Lade till en privat anteckning ${formatRelative(c.date)}${c.recipients ? '. Meddelat till: ' + c.recipients : ''}`
                : c.type === 'public_note'
                ? `Lade till en offentlig anteckning ${formatRelative(c.date)}${c.recipients ? '. Meddelat till: ' + c.recipients : ''}`
                : `svarade ${formatRelative(c.date)}${c.recipients ? ' till ' + c.recipients : ''}`;

            return `
                <div class="conversation-item ${isPrivate ? 'private' : ''}">
                    <div class="conversation-header">
                        <div class="conversation-author">
                            <div class="avatar" style="background:${color}">${initial}</div>
                            <div>
                                <div class="conversation-author-name">${escapeHtml(c.author)}</div>
                                <div class="conversation-meta">${metaText}</div>
                            </div>
                        </div>
                        ${typeLabel ? `<span class="conversation-badge">${typeLabel}</span>` : ''}
                    </div>
                    <div class="conversation-body">${escapeHtml(c.body).replace(/\n/g, '<br>')}</div>
                </div>
            `;
        }).join('');
    }

    function renderActivity(t) {
        const container = document.getElementById('activity-list');
        if (t.activity.length === 0) {
            container.innerHTML = '<p class="empty-state">Ingen aktivitet registrerad.</p>';
            return;
        }

        container.innerHTML = t.activity.map(a => `
            <div class="activity-item">
                <div class="activity-dot"></div>
                <div>
                    <div class="activity-text">${escapeHtml(a.text)}</div>
                    <div class="activity-time">${formatDateTime(a.time)}</div>
                </div>
            </div>
        `).join('');
    }

    // --- Reply ---
    function showReplyBox() {
        document.getElementById('reply-box').style.display = 'block';
        document.getElementById('reply-text').value = '';
        document.getElementById('reply-private').checked = false;
        // Switch to conversations tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        document.querySelector('.tab[data-tab="conversations"]').classList.add('active');
        document.getElementById('tab-conversations').classList.add('active');
        document.getElementById('reply-text').focus();
    }

    function hideReplyBox() {
        document.getElementById('reply-box').style.display = 'none';
    }

    function sendReply() {
        const text = document.getElementById('reply-text').value.trim();
        if (!text || !currentTicket) return;

        const isPrivate = document.getElementById('reply-private').checked;
        const now = new Date().toISOString();

        currentTicket.conversations.push({
            author: 'Du',
            email: 'user@vectura.se',
            date: now,
            type: isPrivate ? 'private_note' : 'reply',
            recipients: currentTicket.requester.email,
            body: text
        });

        currentTicket.activity.push({
            text: isPrivate ? 'Privat anteckning tillagd' : 'Svar skickat',
            time: now
        });

        renderConversations(currentTicket);
        renderActivity(currentTicket);
        hideReplyBox();
    }

    // --- Modal: New / Edit ticket ---
    function openNewTicketModal() {
        editingTicketId = null;
        modalTitle.textContent = 'Nytt ärende';
        ticketForm.reset();
        document.getElementById('form-company').value = 'Vectura';
        ticketModal.style.display = 'flex';
    }

    function openEditTicketModal(t) {
        editingTicketId = t.id;
        modalTitle.textContent = 'Redigera ärende #' + t.id;
        document.getElementById('form-subject').value = t.subject;
        document.getElementById('form-description').value = t.description;
        document.getElementById('form-requester').value = t.requester.name;
        document.getElementById('form-email').value = t.requester.email;
        document.getElementById('form-priority').value = t.priority;
        document.getElementById('form-status').value = t.status;
        document.getElementById('form-type').value = t.type;
        document.getElementById('form-source').value = t.source;
        document.getElementById('form-urgency').value = t.urgency;
        document.getElementById('form-impact').value = t.impact;
        document.getElementById('form-group').value = t.group;
        document.getElementById('form-handler').value = t.handler;
        document.getElementById('form-department').value = t.department;
        document.getElementById('form-category').value = t.category;
        document.getElementById('form-company').value = t.company;
        document.getElementById('form-tags').value = t.tags.join(', ');
        ticketModal.style.display = 'flex';
    }

    function closeModal() {
        ticketModal.style.display = 'none';
        editingTicketId = null;
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const data = {
            subject: document.getElementById('form-subject').value.trim(),
            description: document.getElementById('form-description').value.trim(),
            requester: {
                name: document.getElementById('form-requester').value.trim(),
                email: document.getElementById('form-email').value.trim()
            },
            priority: document.getElementById('form-priority').value,
            status: document.getElementById('form-status').value,
            type: document.getElementById('form-type').value,
            source: document.getElementById('form-source').value,
            urgency: document.getElementById('form-urgency').value,
            impact: document.getElementById('form-impact').value,
            group: document.getElementById('form-group').value,
            handler: document.getElementById('form-handler').value,
            department: document.getElementById('form-department').value,
            category: document.getElementById('form-category').value,
            company: document.getElementById('form-company').value.trim(),
            tags: document.getElementById('form-tags').value.split(',').map(s => s.trim()).filter(Boolean)
        };

        if (editingTicketId) {
            // Update existing
            const ticket = tickets.find(t => t.id === editingTicketId);
            if (ticket) {
                const oldStatus = ticket.status;
                Object.assign(ticket, data);
                if (oldStatus !== data.status) {
                    ticket.activity.push({
                        text: `Status ändrad från ${oldStatus} till ${data.status}`,
                        time: new Date().toISOString()
                    });
                    if (data.status === 'Stängd' && !ticket.closed) {
                        ticket.closed = new Date().toISOString();
                    }
                }
                ticket.activity.push({
                    text: 'Ärende uppdaterat',
                    time: new Date().toISOString()
                });
                closeModal();
                showDetailView(ticket);
            }
        } else {
            // Create new
            const now = new Date().toISOString();
            const newTicket = {
                id: 'SR-' + nextId++,
                ...data,
                plannedStart: null,
                plannedEnd: null,
                created: now,
                closed: data.status === 'Stängd' ? now : null,
                conversations: [],
                activity: [
                    { text: `Ärende skapat av ${data.requester.name}`, time: now }
                ],
                resolution: null
            };
            if (data.handler) {
                newTicket.activity.push({
                    text: `Tilldelad till ${data.handler}${data.group ? ' i gruppen ' + data.group : ''}`,
                    time: now
                });
            }
            tickets.unshift(newTicket);
            closeModal();
            renderTicketList();
        }
    }

    // --- Stats ---
    function renderStats() {
        const total = tickets.length;
        const open = tickets.filter(t => t.status !== 'Stängd').length;
        const closed = tickets.filter(t => t.status === 'Stängd').length;

        document.getElementById('stat-total').textContent = total;
        document.getElementById('stat-open').textContent = open;
        document.getElementById('stat-closed').textContent = closed;

        // Average resolution time
        const closedTickets = tickets.filter(t => t.closed && t.created);
        if (closedTickets.length > 0) {
            const avgMs = closedTickets.reduce((sum, t) => {
                return sum + (new Date(t.closed) - new Date(t.created));
            }, 0) / closedTickets.length;
            const hours = Math.round(avgMs / (1000 * 60 * 60));
            document.getElementById('stat-avg-time').textContent = hours + 'h';
        } else {
            document.getElementById('stat-avg-time').textContent = '-';
        }

        // Charts
        renderBarChart('chart-priority', countBy(tickets, 'priority'),
            { 'Låg': '#16a34a', 'Medium': '#ca8a04', 'Hög': '#ea580c', 'Akut': '#dc2626' });

        renderBarChart('chart-category', countBy(tickets, 'category'),
            { 'Ärendehantering': '#2563eb', 'Hårdvara': '#e67e22', 'Mjukvara': '#9b59b6', 'Nätverk': '#1abc9c', 'Åtkomst': '#e74c3c' });

        renderBarChart('chart-group', countBy(tickets, 'group'),
            { 'MissionPoint': '#e74c3c', 'Infrastruktur': '#3498db', 'Support': '#2ecc71', 'Utveckling': '#9b59b6' });

        renderBarChart('chart-status', countBy(tickets, 'status'),
            { 'Öppen': '#2563eb', 'Pågår': '#ca8a04', 'Väntar': '#9333ea', 'Stängd': '#16a34a' });
    }

    function renderBarChart(containerId, data, colors) {
        const container = document.getElementById(containerId);
        const max = Math.max(...Object.values(data), 1);

        container.innerHTML = Object.entries(data).map(([label, count]) => {
            const pct = (count / max) * 100;
            const color = colors[label] || '#64748b';
            return `
                <div class="bar-row">
                    <span class="bar-label">${label || 'Okänd'}</span>
                    <div class="bar-track">
                        <div class="bar-fill" style="width:${pct}%;background:${color}"></div>
                    </div>
                    <span class="bar-value">${count}</span>
                </div>
            `;
        }).join('');
    }

    function countBy(arr, key) {
        const counts = {};
        arr.forEach(item => {
            const val = item[key] || 'Okänd';
            counts[val] = (counts[val] || 0) + 1;
        });
        return counts;
    }

    // --- Helpers ---
    function priorityClass(p) {
        switch (p) {
            case 'Låg': return 'low';
            case 'Medium': return 'medium';
            case 'Hög': return 'high';
            case 'Akut': return 'urgent';
            default: return '';
        }
    }

    function statusClass(s) {
        switch (s) {
            case 'Öppen': return 'status-open';
            case 'Pågår': return 'status-progress';
            case 'Väntar': return 'status-waiting';
            case 'Stängd': return 'status-closed';
            default: return '';
        }
    }

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' });
    }

    function formatDateTime(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) +
            ' ' + d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
    }

    function formatRelative(dateStr) {
        const d = new Date(dateStr);
        const now = new Date();
        const diff = now - d;
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (mins < 1) return 'just nu';
        if (mins < 60) return `för ${mins} min sedan`;
        if (hours < 24) return `för ${hours} tim sedan`;
        if (days === 1) return 'igår';
        if (days < 7) return `för ${days} dagar sedan`;
        return formatDateTime(dateStr);
    }

    function timeDiff(start, end) {
        const diff = end - start;
        const hours = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        if (hours >= 24) {
            const days = Math.floor(hours / 24);
            const remHours = hours % 24;
            return `${days}d ${remHours}h ${mins}min`;
        }
        return `${hours}h ${mins}min`;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
})();
