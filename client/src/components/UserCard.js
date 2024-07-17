import React from 'react';


const UserCard = ({ user }) => {
	const { username, reviews } = user

	return (
		<div className="user-card">
			<h3>User: {username}</h3>
				<div className='reviews'>
					{reviews.map((review) => (
					<div key={review.id} className='review-card'>
						<h4>{review.shoe.brand} {review.shoe.model}</h4>
						<img 
							src={review.shoe.image_url} 
							alt={review.shoe.model}
							className='shoe-image'
						/>
						<p>Review: {review.content}</p>
						<p className='rating'>Rating: {review.rating}</p>
						<p>Category: {review.shoe.category.name}</p>
					</div>
					))}
				</div>
		</div>
	)
}

export default UserCard