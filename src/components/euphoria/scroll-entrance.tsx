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

function isMobile() {
  return window.matchMedia("(max-width: 1023px)").matches;
}

function viewportBox() {
  const visual = window.visualViewport;
  const top = visual?.offsetTop ?? 0;
  const height = visual?.height ?? window.innerHeight;
  return { top, bottom: top + height };
}

function onScreen(node: Element, mobile: boolean) {
  const box = node.getBoundingClientRect();
  if (box.width < 1 || box.height < 1) return false;
  const view = viewportBox();
  const visible = Math.min(box.bottom, view.bottom) - Math.max(box.top, view.top);
  if (mobile) return visible > 0;
  if (box.height > (view.bottom - view.top) * 0.72) return visible >= (view.bottom - view.top) * 0.22;
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
    const seen = new WeakSet<Element>();
    let frame = 0;
    let observer: IntersectionObserver | null = null;

    const revealNow = (nodes: Element[]) => {
      if (nodes.length === 0) return;
      revealBatch(nodes);
    };

    const collectVisible = () => {
      const mobile = isMobile();
      const batch: Element[] = [];
      document.querySelectorAll(SELECTOR).forEach((node) => {
        if (seen.has(node) || node.classList.contains("is-shown")) return;
        if (node.closest(".hero, header.fixed")) return;
        if (
          node.classList.contains("studio-photo-in") &&
          node.closest(".studio-sat:not(.is-shown)")
        ) {
          return;
        }
        if (reduced || onScreen(node, mobile)) {
          seen.add(node);
          observer?.unobserve(node);
          batch.push(node);
        } else if (observer) {
          observer.observe(node);
        }
      });
      revealNow(batch);
    };

    const scan = () => {
      collectVisible();
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
          const mobile = isMobile();
          entries.forEach((entry) => {
            if (!entry.isIntersecting || !onScreen(entry.target, mobile) || seen.has(entry.target)) return;
            seen.add(entry.target);
            current.unobserve(entry.target);
            const group = entry.target.closest("section, footer") ?? entry.target;
            const list = groups.get(group) ?? [];
            list.push(entry.target);
            groups.set(group, list);
          });
          groups.forEach((nodes) => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => revealNow(nodes));
            });
          });
        },
        isMobile()
          ? { rootMargin: "40px 0px 40px 0px", threshold: [0, 0.01] }
          : { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.2, 0.45, 0.7] }
      );
    } catch {
      showEntranceTargets();
      return;
    }

    schedule();
    const onMove = () => schedule();
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    window.visualViewport?.addEventListener("resize", onMove);
    window.visualViewport?.addEventListener("scroll", onMove);
    const later = window.setTimeout(onMove, 400);
    const mutations = new MutationObserver((records) => {
      if (records.some((record) => record.addedNodes.length > 0)) schedule();
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(later);
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
      window.visualViewport?.removeEventListener("resize", onMove);
      window.visualViewport?.removeEventListener("scroll", onMove);
      observer?.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
