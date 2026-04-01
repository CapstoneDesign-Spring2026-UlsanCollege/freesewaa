import React, { useState, useEffect, useCallback } from 'react';
import './ItemDetailModal.css';

/**
 * ItemDetailModal component
 * Issue #27: Display full item details in a modal.
 * Issue #29: Request confirmation flow with localStorage tracking and donor contact reveal.
 *
 * Props:
 *   item   {Object|null} - The item to display; null hides the modal.
 *   onClose {Function}  - Callback to close the modal.
 */
function ItemDetailModal({ item, onClose }) {
  const [requestState, setRequestState] = useState('idle'); // 'idle' | 'confirming' | 'requested'

  // On each new item, reset state and check localStorage
  useEffect(() => {
    if (!item) return;
    const requested = JSON.parse(localStorage.getItem('requestedItems') || '[]');
    if (requested.includes(item.id)) {
      setRequestState('requested');
    } else {
      setRequestState('idle');
    }
  }, [item]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!item) return null;

  const handleRequestClick = () => {
    setRequestState('confirming');
  };

  const handleConfirm = () => {
    // Save request to localStorage so duplicate requests are blocked
    const requested = JSON.parse(localStorage.getItem('requestedItems') || '[]');
    if (!requested.includes(item.id)) {
      requested.push(item.id);
      localStorage.setItem('requestedItems', JSON.stringify(requested));
    }
    setRequestState('requested');
  };

  const handleCancel = () => {
    setRequestState('idle');
  };

  const conditionBadgeClass = (condition) => {
    const map = {
      New: 'badge-new',
      'Like New': 'badge-like-new',
      Good: 'badge-good',
      Fair: 'badge-fair',
      Poor: 'badge-poor',
    };
    return `condition-badge ${map[condition] || 'badge-good'}`;
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Item header */}
        <div className="modal-header">
          <h2 id="modal-title" className="modal-item-title">{item.title}</h2>
          <div className="modal-badges">
            <span className="category-badge">{item.category}</span>
            <span className={conditionBadgeClass(item.condition)}>{item.condition}</span>
          </div>
        </div>

        {/* Item details */}
        <div className="modal-body">
          <section className="detail-section">
            <h3 className="detail-label">📝 Description</h3>
            <p className="detail-text">{item.description}</p>
          </section>

          <section className="detail-section">
            <h3 className="detail-label">📍 Location</h3>
            <p className="detail-text">{item.location}</p>
          </section>

          {item.postedAt && (
            <section className="detail-section">
              <h3 className="detail-label">🗓 Posted</h3>
              <p className="detail-text">
                {new Date(item.postedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </section>
          )}

          {/* Donor contact — only shown after request confirmed */}
          {requestState === 'requested' && (
            <section className="detail-section contact-section">
              <h3 className="detail-label">📬 Donor Contact</h3>
              <div className="contact-info">
                {item.contactEmail && (
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${item.contactEmail}`}>{item.contactEmail}</a>
                  </p>
                )}
                {item.contactPhone && (
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a href={`tel:${item.contactPhone}`}>{item.contactPhone}</a>
                  </p>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Action area */}
        <div className="modal-footer">
          {requestState === 'idle' && (
            <button className="btn-request" onClick={handleRequestClick}>
              🙋 Request This Item
            </button>
          )}

          {requestState === 'confirming' && (
            <div className="confirm-dialog">
              <p className="confirm-text">
                Are you sure you want to request <strong>{item.title}</strong>?
                The donor's contact info will be revealed.
              </p>
              <div className="confirm-actions">
                <button className="btn-confirm" onClick={handleConfirm}>
                  ✅ Yes, Request
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {requestState === 'requested' && (
            <div className="request-success">
              <span className="request-success-icon">🎉</span>
              <p>Request sent! Contact the donor using the info above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetailModal;
