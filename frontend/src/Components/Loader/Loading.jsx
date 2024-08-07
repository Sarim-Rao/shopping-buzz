import "../Loader/Loading.css"


const Loading = () => {
  return (
    <div className="center-things">
    <div className="shimmer-wrapper">
        <div className="profile">
            <div className="shimmer-circle shimmer-circle-md shimmer-animate"></div>
            <div className="profile-data">
                <div className="shimmer-line shimmer-line-br shimmer-line-60 shimmer-animate"></div>
                <div className="shimmer-line shimmer-line-br shimmer-line-full  shimmer-animate"></div>
            </div>
        </div>
        <div className="shimmer-line shimmer-line-br shimmer-line-full shimmer-animate"></div>
        <div className="shimmer-line shimmer-line-br shimmer-line-full shimmer-animate"></div>
    </div>
</div>
  )
}

export default Loading
