const TopCardBlock = () => {

  
  const cardContent = [
    { id: 1, 
      icon: "flaticon-briefcase",
      countNumber: "22",
      metaName: "Total Company",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: "50",
      metaName: "Active Verification",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "la-comment-o",
      countNumber: "74",
      metaName: "Pending Verification",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      countNumber: "200",
      metaName: "Wallet",
      uiClass: "ui-green",
    },
  ];

  return (
    
    <>

    
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left" >
            <i className={`icon la ${item.icon}`} style={{ height:"37px",width:"31px",lineHeight:"25px" }}></i>

            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
