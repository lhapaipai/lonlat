function TooltipLegacy() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "tooltip",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps} id="button" aria-describedby="tooltip">
        My button
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          className="ll-dialog type-info"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <div className="box">
            <div className="description">infos</div>
          </div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-bg"></div>
          <div style={{ left: "18px", bottom: "-6px" }} className="arrow arrow-shadow"></div>
        </div>
      )}
    </>
  );
}
