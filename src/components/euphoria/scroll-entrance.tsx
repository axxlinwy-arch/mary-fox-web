"use client";

import { useEffect } from "react";

const SELECTOR = [
  ".cascade-item",
  ".master-highlight",
  ".master-reveal",
  ".gallery-row-in",
  ".studio-sat",
  ".studio-photo-in",
  ".cowork-statue",
  ".enter",
].join(",");

const MAX_STAGGER = 6;
const STAGGER_STEP = 0.11;

function ready(entry: IntersectionObserverEntry, mobile: boolean) {
  if (!entry.isIntersecting) return false;
  const box = entry.boundingClientRect;
  if (box.height < 8 || box.width < 8) return false;
  const view = entry.rootBounds?.height || window.innerHeight;
  if (mobile) {
    const onScreen = Math.min(box.bottom, view) - Math.max(box.top, 0);
    return onScreen >= 16;
  }
  const visible = entry.intersectionRect.height;
  if (box.height > view * 0.72) return visible >= view * 0.22;
  const need = box.height <= 40 ? box.height * 0.7 : Math.min(Math.max(box.height * 0.45, 24), 120);
  return visible >= need;
}

function revealBatch(nodes: Element[]) {
  const sorted = [...nodes].sort((a, b) => {
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    return ra.top - rb.top || ra.left - rb.left;
  });
  const view = window.innerHeight;
  let step = 0;
  let anchor = sorted[0]?.getBoundingClientRect().top ?? 0;

  sorted.forEach((node) => {
    const top = node.getBoundingClientRect().top;
    if (top - anchor > view * 0.42) {
      step = 0;
      anchor = top;
    }
    const delay = `${Math.min(step, MAX_STAGGER) * STAGGER_STEP}s`;
    step += 1;
    if (node instanceof HTMLElement) {
      node.style.setProperty("--enter-delay", delay);
    }
    node.classList.add("is-shown");
    if (node.classList.contains("studio-sat")) {
      node.querySelectorAll(".studio-photo-in").forEach((photo) => {
        photo.classList.add("is-shown");
      });
    }
  });
}

function showEntranceTargets() {
  document.querySelectorAll(SELECTOR).forEach((node) => {
    if (node.closest(".hero, header.fixed")) return;
    node.classList.add("is-shown");
    if (node.classList.contains("studio-sat")) {
      node.querySelectorAll(".studio-photo-in").forEach((photo) => {
        photo.classList.add("is-shown");
      });
    }
  });
}

export function ScrollEntrance() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    const mobile = mobileQuery.matches;
    const seen = new WeakSet<Element>();
    let frame = 0;
    let observer: IntersectionObserver | null = null;

    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((node) => {
        if (seen.has(node) || node.classList.contains("is-shown")) return;
        if (node.closest(".hero, header.fixed")) return;
        if (
          node.classList.contains("studio-photo-in") &&
          node.closest(".studio-sat:not(.is-shown)")
        ) {
          return;
        }
        if (reduced || !observer) {
          node.classList.add("is-shown");
          return;
        }
        observer.observe(node);
      });
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    };

    try {
      if (typeof IntersectionObserver === "undefined") {
        throw new Error("IntersectionObserver unavailable");
      }
      observer = new IntersectionObserver(
        (entries) => {
          const current = observer;
          if (!current) return;
          const groups = new Map<Element, Element[]>();
          entries.forEach((entry) => {
            if (!ready(entry, mobile) || seen.has(entry.target)) return;
            seen.add(entry.target);
            current.unobserve(entry.target);
            const group = entry.target.closest("section, footer") ?? entry.target;
            const list = groups.get(group) ?? [];
            list.push(entry.target);
            groups.set(group, list);
          });
          groups.forEach((nodes) => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => revealBatch(nodes));
            });
          });
        },
        mobile
          ? { rootMargin: "0px 0px -12px 0px", threshold: [0, 0.03, 0.08, 0.15] }
          : { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.2, 0.45, 0.7] }
      );
    } catch {
      showEntranceTargets();
      return;
    }

    schedule();
    const mutations = new MutationObserver((records) => {
      if (records.some((record) => record.addedNodes.length > 0)) schedule();
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
